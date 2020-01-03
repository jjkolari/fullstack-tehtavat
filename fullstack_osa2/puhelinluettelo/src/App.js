import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personsService'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (error) {
    return(
      <div className="error">
      {message}
    </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePersonOf = id => {
    const personObject = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personObject.name}?`)) {
      setSuccessMessage(
        `Deleted ${personObject.name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

      personService
        .deleteP(personObject)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
    
  }


  const addPerson = (event) => {
    event.preventDefault()
    var found = persons.find(person => person.name === newName)
    
    if (!found) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response)
        })

        setSuccessMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)

    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
        .update(person.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
        })
        .then(setSuccessMessage(
          `Changed number of ${person.name}`
        ),
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000))
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setSuccessMessage(null)
        })
        

      }

    }

  }

  const rows = () => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
      deletePerson={() => deletePersonOf(person.id)}
    />
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (filter.length === 0) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} error={false} />
      <Notification message={errorMessage} error={true}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <div>{rows()}</div>
     </div>
  )

}

export default App
