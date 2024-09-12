document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const details = document.getElementById('details').value;

    const taskData = {
        courseId,
        taskName,
        dueDate,
        details
    };

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    const result = await response.json();
    alert(result.message);
});

document.getElementById('fetchTasksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseId = document.getElementById('fetchCourseId').value;

    const response = await fetch(`http://localhost:3000/courses/${courseId}/tasks`);
    const tasks = await response.json();

    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = '<h2 id="title1">Tasks:</h2>';

    if (tasks.length > 0) {
        tasks.forEach(task => {
            taskListDiv.innerHTML += `
                <p class="task-paragraph"><strong>Task Name:</strong> ${task.taskName} <br>
                <strong>Due Date:</strong> ${task.dueDate} <br>
                <strong>Details:</strong> ${task.details}</p>
            `;
        });
    } else {
        taskListDiv.innerHTML = '<p>No tasks found for this course.</p>';
    }
});
