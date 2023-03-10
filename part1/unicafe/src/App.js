import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const Display = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Average = ({ scores }) => {

  console.log('scores', scores)
  console.log('scores length', scores.length)

  if (scores.length === 0) {
    return (
      <div>No scores available</div>
    )
  } else {
    let sum = scores.reduce((total, num) => total + num)
    console.log('sum', sum)
    console.log('length', scores.length)
  
    let average = sum / scores.length

    return (
      <Display text='Average' value={average} />
    )
  }
}

const Postive = ({ good, total }) => {

  if (total === 0) {
    return (
      <div>No scores available</div>
    )
  } else {
    let percentPositive = good / total

    return (
      <Display text='% Positive' value={percentPositive} />
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allScores, setAllScores] = useState([])

  const handleGood = () => {
    setGood(good + 1)
    setAllScores(allScores.concat(1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAllScores(allScores.concat(0))
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAllScores(allScores.concat(-1))
  }

  return (
    <div>
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <Display text='Good' value={good} />
      <Display text='Neutral' value={neutral} />
      <Display text='Bad' value={bad} />
      <Average scores={allScores} />
      <Postive good={good} total={good + bad + neutral} />
    </div>
  )
}

export default App
