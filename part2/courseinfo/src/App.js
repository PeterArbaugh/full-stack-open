const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
  const allExercises = course.parts.map((x) => {
    return x.exercises
  }) 
  console.log(allExercises)

  const total = allExercises.reduce((total, number) => {
    return total + number
  })
  console.log('total', total);

  return (
    <p>Number of exercises {total}</p>
  )
}



const Part = ({ id, name, exercises }) => 
  <p key={id}>
    {name} {exercises}
  </p>

const Content = ({ parts }) => {

  return (
    <>
    {parts.map( parts =>
      <Part key={parts.id} name={parts.name} exercises={parts.exercises} />
    )}
  </>
  )
}


const Course =({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total course={course} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
