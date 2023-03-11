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

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <Display text='Good' value={props.good} />
      <Display text='Neutral' value={props.neutral} />
      <Display text='Bad' value={props.bad} />
      <Display text='All' value={props.good + props.bad + props.neutral} />
      <Average scores={props.allScores} />
      <Postive good={props.good} total={props.good + props.bad + props.neutral} />
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