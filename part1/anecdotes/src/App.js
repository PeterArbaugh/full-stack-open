import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const Winner = ({ votes, anecdotes }) => {
    const max = Math.max(...votes)
    const position = votes.indexOf(max)

    if (max === 0) {
      return (
        <div>
          No votes available
        </div>
      )
    }

    return (
      <div>
        <h2>Winner</h2>
        {anecdotes[position]}
      </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectRandom = () => {
    const min = 0
    const max = anecdotes.length - 1
    const randomInt = Math.floor(Math.random() * (max - min + 1))
    console.log(randomInt)
    setSelected(randomInt)
  }

  const inputVote = ( selected ) => {
    setVotes([
      ...votes.slice(0, selected),
      votes[selected] += 1,
      ...votes.slice(selected + 1)
    ])
    console.log('Votes', votes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <br/>
      <Button text='Vote' handleClick={() => inputVote(selected)} />
      <Button text='Next quote' handleClick={selectRandom} />
      <Winner votes={votes} anecdotes={anecdotes} />
    </div>

  )
}

export default App