import { useState, useEffect } from 'react';
import './App.css';
import { getTodos, addTodo, updateTodo } from './services/todoService';

function App() {
  const [todos, setToDos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos();
      setToDos(result.map((todo) => ({ ...todo, isEditing: false })));
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;
    const createdTodo = await addTodo(newTask);
    if (createdTodo) {
      setToDos((prevTodos) => [
        ...prevTodos,
        { ...createdTodo, isEditing: false },
      ]);
      setNewTask('');
    }
  };

  const toggleEdit = (id) => {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: true }
          : { ...todo, isEditing: false }
      )
    );
  };

  const handleTaskChange = (id, newValue) => {
    setToDos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, task: newValue } : todo))
    );
  };

  const saveTask = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateTodo(id, { task: todo.task, completed: todo.completed });
    setToDos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isEditing: false } : t))
    );
  };

  const toggleCompleted = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = { ...todo, completed: !todo.completed };
    await updateTodo(id, updated);
    setToDos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'center' }}>TODO:</h1>

      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Skapa ny uppgift..."
          style={{ flex: 1, marginRight: '8px' }}
        />
        <button onClick={handleAddTodo}>Lägg till</button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '8px',
          }}
        >
          {todo.isEditing ? (
            <input
              type="text"
              value={todo.task}
              onChange={(e) => handleTaskChange(todo.id, e.target.value)}
              onBlur={() => saveTask(todo.id)}
              style={{ flex: 1, padding: '6px' }}
            />
          ) : (
            <p
              onClick={() => toggleEdit(todo.id)}
              style={{
                flex: 1,
                margin: 0,
                textAlign: 'left',
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </p>
          )}

          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
