import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, value, percentage }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {percentage}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
      <Statistic text="positive" value={good / (good + neutral + bad)} percentage="%" />
    </table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = (value) => setGood(value)
  const setNeutralToValue = (value) => setNeutral(value)
  const setBadToValue = (value) => setBad(value)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={() => setGoodToValue(good + 1)}
        text='good'
      />
      <Button
        onClick={() => setNeutralToValue(neutral + 1)}
        text='neutral'
      />
      <Button
        onClick={() => setBadToValue(bad + 1)}
        text='bad'
      />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)