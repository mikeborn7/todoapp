const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Create a simplified version of the app for testing
const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // Simulate the in-memory task storage

// Routes (same as your app.js)
app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task text is required' });
    }
    const newTask = { id: tasks.length + 1, text: task.trim() };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Tests
describe('ToDoApp API', () => {
    beforeEach(() => {
        tasks = []; // Reset tasks before each test
    });

    test('GET /tasks should return an empty array initially', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST /tasks should add a task', async () => {
        const response = await request(app).post('/tasks').send({ task: 'Test Task' });
        expect(response.status).toBe(201);
        expect(response.body.text).toBe('Test Task');
    });

    test('POST /tasks should validate task input', async () => {
        const response = await request(app).post('/tasks').send({ task: '' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Task text is required');
    });

    test('DELETE /tasks/:id should delete a task', async () => {
        // Add a task first
        await request(app).post('/tasks').send({ task: 'Task to Delete' });

        const response = await request(app).delete('/tasks/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully');
    });

    test('DELETE /tasks/:id should return 404 for non-existent task', async () => {
        const response = await request(app).delete('/tasks/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });

});
