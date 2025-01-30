const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = []; // In-memory task storage

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task text is required' });
    }

    const newTask = { id: tasks.length + 1, text: task.trim() };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Catch-all for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app for Jest
module.exports = app;
