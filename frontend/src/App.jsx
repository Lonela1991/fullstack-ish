import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setToDos] = useState([])

  useEffect(() => {
      fetch('/api/gettodos')
        .then((response) => response.json())
        .then((result) => setToDos(result))
  }, [])

  return (
    <>
      <h1>ToDo Lista</h1>
      {todos.map(todo => (
      <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
       <input type="text" value={todo.task} disabled style={{ flex: 1, marginRight: '8px', textAlign: 'left' }}/>
       <input type="checkbox" checked={todo.completed} />
      </div>
      ))}
    </>
  )
}

export default App
