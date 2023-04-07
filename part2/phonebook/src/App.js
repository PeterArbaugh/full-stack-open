import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name}: {person.number} 
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

const NumberList = ({ personsToShow, deletePerson }) => (
  <ul>
  {personsToShow.map(person =>
    <Person 
      key={person.id} 
      person={person}  
      handleDelete={() => deletePerson(person.id, person.name)}
      /> 
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
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
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
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log(persons)
        })
    }
  }

  const deletePerson = (id) => {
    personService.deletePerson(id)
    .then(() => {
      const updatedPersons = persons.filter(person => person.id !== id)
      setPersons(updatedPersons)
      console.log('updated:',updatedPersons)
    })
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
        deletePerson={deletePerson}
        />
    </div>
  )
}

export default App
