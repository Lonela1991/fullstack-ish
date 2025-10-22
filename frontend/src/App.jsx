import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setToDos] = useState([])

  useEffect(() => {
      fetch('/api')
        .then((response) => response.json())
        .then((result) => setToDos(result))
  }, [])

  return (
    <>
      <div>
       <h1>My TODO:</h1>
       <ul>
         {todos.map((todo) => (
           <li key={todo.id}>{todo.task}{todo.completed ? '✅' : ''} </li>
         ))}
       </ul>
      </div>
    </>
  )
}

export default App
