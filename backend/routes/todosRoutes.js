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

// Lägg till en ny todo
router.post('/addtodo', async (req, res) => {
  const { task, completed } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *',
      [task, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database insert failed');
  }
});

export default router;