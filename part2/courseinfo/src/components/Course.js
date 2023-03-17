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

const Course =({ course }) => {
    
    return (
  course.map(course => 
    <div key={course.id}>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
)}

export default Course