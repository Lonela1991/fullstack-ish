import { useState, useEffect } from 'react';
import './App.css';
import { getTodos, addTodo } from './services/todoService';

function App() {
  const [todos, setToDos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos();
      setToDos(result);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;

    const createdTodo = await addTodo(newTask);
    if (createdTodo) {
      setToDos((prevTodos) => [...prevTodos, createdTodo]);
      setNewTask('');
    }
  }

  return (
    <>
      <h1>ToDo Lista</h1>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Skriv en ny todo"
          style={{ flex: 1, marginRight: '8px' }}
        />
        <button onClick={handleAddTodo}>Lägg till</button>
      </div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <input
            type="text"
            value={todo.task}
            disabled
            style={{ flex: 1, marginRight: '8px', textAlign: 'left' }}
          />
          <input type="checkbox" checked={todo.completed} />
        </div>
      ))}
    </>
  );
}

export default App;
