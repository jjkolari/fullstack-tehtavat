import React from 'react'
import Person from './Person'

const Persons = ({ personsToShow, deletePerson }) => 

personsToShow.map(person =>
    <Person
      person={person}
      deletePerson={deletePerson}
    />
  )

  export default Persons