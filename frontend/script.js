document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    const backendUrl = 'http://localhost:3000/tasks';

    const showError = (message) => {
        alert(message); // For simplicity, use an alert. Can be replaced with better UI feedback.
    };

    // Fetch and display tasks
    const loadTasks = async () => {
        taskList.innerHTML = '';
        try {
            const response = await fetch(backendUrl);
            if (!response.ok) throw new Error('Failed to fetch tasks');

            const tasks = await response.json();
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', async () => {
                    try {
                        const res = await fetch(`${backendUrl}/${task.id}`, { method: 'DELETE' });
                        if (!res.ok) throw new Error('Failed to delete task');
                        loadTasks();
                    } catch (err) {
                        showError(err.message);
                    }
                });

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        } catch (err) {
            showError(err.message);
        }
    };

    // Add a new task
    addTaskButton.addEventListener('click', async () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            showError('Task cannot be empty!');
            return;
        }

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: taskText }),
            });
            if (!response.ok) throw new Error('Failed to add task');

            taskInput.value = '';
            loadTasks();
        } catch (err) {
            showError(err.message);
        }
    });

    // Load tasks on page load
    loadTasks();
});
