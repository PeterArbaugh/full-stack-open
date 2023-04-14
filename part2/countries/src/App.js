import { useState, useEffect } from "react";
import axios from 'axios'

const owAPIKey = process.env.REACT_APP_API_KEY

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
  const capLat = country.capitalInfo.latlng[0]
  console.log('lat', capLat)
  const capLng = country.capitalInfo.latlng[1]
  console.log('Lng', capLng)

  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log('effect - weather')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capLat}&lon=${capLng}&appid=${owAPIKey}&units=metric`)
      .then(response => {
        setWeather({
          "temperature": response.data.main.temp,
          "current": response.data.weather[0].main,
          "icon": response.data.weather[0].icon,
          "alt": response.data.weather[0].description
        })

      })
  }, [capLat, capLng])
  console.log(weather)
  
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
      <h3>Weather in {country.capital}</h3>
      <ul>
        <li>Temperature: {weather.temperature}</li>
        <li>Current conditions: {weather.current}</li>
      </ul>
      <img src={"https://openweathermap.org/img/wn/" + weather.icon + "@2x.png"} alt={weather.alt}></img>
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
    console.log('effect - countries')
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
