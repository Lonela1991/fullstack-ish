import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import {Client} from 'pg';

dotenv.config();

const pgClient = new Client({
  connectionString: process.env.PGURI,
});

pgClient.connect()

const app = express();

const port = process.env.PORT || 3000;

// "/api" istället för enbart "/" för att undvika krock med frontend-rutter
app.get('/api', async (_request, response) => {
  const {rows} = await pgClient.query('SELECT * FROM todos;');
  response.send(rows);
})

console.log("Katalogen vi är i:",path.resolve());
console.log("join:", path.join(path.resolve(), 'dist'));

//Om vi får en förfrågan på en fil som inte är "/api", så kolla i "dist"-mappen
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Backend:et är igång på ${port}`);
})