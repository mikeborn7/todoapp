const request = require('supertest');
const app = require('../app'); // Import the app

describe('ToDoApp API', () => {
    beforeEach(() => {
        // Reset tasks before each test
        global.tasks = [];
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

        // Delete the task
        const response = await request(app).delete('/tasks/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully');
    });

    test('DELETE /tasks/:id should return 404 for non-existent task', async () => {
        const response = await request(app).delete('/tasks/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });

    test('DELETE /tasks/:id should return 404 for invalid ID format', async () => {
        const response = await request(app).delete('/tasks/invalidID');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });

    test('GET unknown route should return 404', async () => {
        const response = await request(app).get('/unknownroute');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Route not found');
    });
});