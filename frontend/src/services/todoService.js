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