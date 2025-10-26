const API_BASE = '/api';

// Hämta alla todos
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE}/gettodos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Lägg till en ny todo
export const addTodo = async (task) => {
  if (!task || task.trim() === '') return null;
  try {
    const response = await fetch(`${API_BASE}/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, completed: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    return await response.json(); // returnerar raden som skapats i databasen
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

// Uppdatera en todo till klar/ej klar
export const updateTodoCompleted = async (id, completed) => {
  try {
    const response = await fetch(`${API_BASE}/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
