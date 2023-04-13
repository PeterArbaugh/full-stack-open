import { useState, useEffect } from "react";
import axios from 'axios'

const Search = (props) => (
  <>
    Search countries: 
    <input
      value={props.value}
      onChange={props.change}
      />
  </>
)

const Country = ({country}) => {
  const [showDetails, setShowDetails] = useState(false)
  console.log('showDetails', showDetails)

  if (showDetails) {
    return (
      <>
      <li>
        {country.name.common}
        <button onClick={() => setShowDetails(!showDetails)}>
          Hide
        </button>
      </li>
      <CountryDetails country={country}/>
      </>
    )
  } else {
    return (
      <li>
        {country.name.common}
        <button onClick={() => setShowDetails(!showDetails)}>
          Show
        </button>
      </li>
    )
  }
}

const CountryDetails = ({country}) => {
  const langArray = Object.entries(country.languages)
  
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Total Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
      {langArray.map(([code, name]) =>
        <li key={code}>{name}</li>
        )}
        </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </>
  )
}

const CountryDisplay = (props) => {
  if (props.countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (props.countries.length === 1) {
    return <CountryDetails country={props.countries[0]} />
  } else {
    return (
      <ul>
        {props.countries.map(country =>
          <Country 
            key={country.name.common} 
            country={country} 
            showDetails={() => props.showDetails(country)} />
          )}
      </ul>
    )
  }
}


const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const allCountries = response.data
        console.log('countries', allCountries);
        setCountries(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterText(event.target.value)
  }

  const showDetails = (country) => {
    console.log('show country', country)
    setCountries([country])
  }

  const countriesToShow = (filterText === '')
    ? []
    : countries.filter((country) => country.name.common.includes(filterText))
    console.log('to show', countriesToShow)

  return (
    <div>
      <Search value={filterText} change={handleFilterChange}/>
      <CountryDisplay 
        countries={countriesToShow} 
        showDetails={showDetails}
        />
    </div>
  );
}

export default App;
