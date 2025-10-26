import express from 'express';
import db from '../db.js';

const router = express.Router();

// Hämta alla todos
router.get('/gettodos', async (_request, response) => {
try {
  const { rows } = await db.query('SELECT * FROM todos;');
  response.json(rows);
} catch (error) {
  console.error('Error fetching todos:', error);
  response.status(500).json({ error: 'Internal Server Error' });
}
});

export default router;