import React, { useState, useEffect } from 'react';

import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>{country.name} </div>
  )
}

const OneCountry = ({ country }) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} width="120" alt="picture"/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (filter.length === 0) {
      setShowCountries(true)
    } else {
      setShowCountries(false)
    }
  }

  const countriesToShow = showCountries
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const listCountries = () =>

    countriesToShow.map(country =>
      <Country
        country={country}
      />
    )

  const howManyCountries = () => {

    if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <OneCountry
            country={country}
          />
        ))
    } else if (countriesToShow.length <= 10) {
      return (
        listCountries()
      )
    } else {
      return (
        <div>Too many matches, specify another filter</div>
      )

    }

  }



  return (
    <div>
      <form>
        <div>find countries <input
          value={filter}
          onChange={handleFilterChange}
        />
        </div>
      </form>
      {howManyCountries()}
    </div>
  )
}

export default App;
