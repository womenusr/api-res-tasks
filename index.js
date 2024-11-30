javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Base de données fictive
let tasks = [
  { id: 1, title: 'Apprendre Node.js', completed: false },
  { id: 2, title: 'Créer une API', completed: true },
];

// Routes

// 1. Récupérer toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Récupérer une tâche par ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
  res.json(task);
});

// 3. Ajouter une nouvelle tâche
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. Mettre à jour une tâche
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.json(task);
});

// 5. Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`API en cours d'exécution sur http://localhost:${port}`);
});
