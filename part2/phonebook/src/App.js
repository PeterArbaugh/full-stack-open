import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => (
    <div>
    filter shown with: <input 
      value={props.value}
      onChange={props.change}
    />
  </div>
  )

const AddPersonForm = (props) => (
  <form onSubmit={props.formSubmit}>
        <div>
          name: <input 
            value={props.nameValue}
            onChange={props.nameChange} 
            />
        </div>
        <div>
          number: <input 
            value={props.numberValue}
            onChange={props.numberChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Person = (props) => {
  return (
    <li>{props.person.name}: {props.person.number}</li>
  )
}

const NumberList = (props) => (
  <ul>
  {props.personsToShow.map(person =>
    <Person key={person.id} person={person} /> 
    )}
</ul>
)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterText(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons.includes(newName))
    if (persons.some(obj => obj.name === newName)){
      alert(`${newName} is already included in the phonebook.`)
      setNewName('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          console.log(persons)
        })
    }
  }

  const personsToShow = (filterText === '')
    ? persons
    : persons.filter((person) => person.name.includes(filterText))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
        value={filterText}
        change={handleFilterChange}
        />

      <h2>Add a person</h2>
      <AddPersonForm
        formSubmit={addPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <NumberList 
        personsToShow={personsToShow}
        />
    </div>
  )
}

export default App
