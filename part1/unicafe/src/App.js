import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  
  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>No feedback given</div>
      </div>
      
    )
  } 
  
  const average = props.allScores.reduce((total, num) => total + num) / props.allScores.length
  const positive = props.good / all
  
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text='Good' value={props.good} />
      <StatisticLine text='Neutral' value={props.neutral} />
      <StatisticLine text='Bad' value={props.bad} />
      <StatisticLine text='All' value={all} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='% Positive' value={positive} />
    </div>
    )
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
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        allScores={allScores} 
        />
    </div>
  )
}

export default App
