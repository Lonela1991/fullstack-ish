import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

// "/api" istället för enbart "/" för att undvika krock med frontend-rutter
app.get('/api', (_request, response) => {
  response.send({ hejsan: 123 })
})

console.log("Katalogen vi är i:",path.resolve());
console.log("join:", path.join(path.resolve(), 'dist'));

//Om vi får en förfrågan på en fil som inte är "/api", så kolla i "dist"-mappen
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Backend:et är igång på ${port}`);
})