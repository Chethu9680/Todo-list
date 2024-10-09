// Selecting necessary DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const deadlineInput = document.getElementById('deadline-input');
const pendingTaskList = document.getElementById('pending-task-list');
const completedTaskList = document.getElementById('completed-task-list');

// Function to create task item
function createTaskItem(taskName, taskDescription, taskDeadline, isCompleted = false) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskNameElem = document.createElement('div');
    taskNameElem.textContent = `Task: ${taskName}`;

    const taskDeadlineElem = document.createElement('div');
    taskDeadlineElem.textContent = `Deadline: ${taskDeadline}`;

    const taskDescriptionElem = document.createElement('div');
    taskDescriptionElem.textContent = `Description: ${taskDescription}`;

    const actionBtn = document.createElement('button');
    const updateBtn = document.createElement('button');

    if (isCompleted) {
        actionBtn.textContent = 'Deadline Over';
        actionBtn.style.backgroundColor = '#dc3545'; // Red
        completedTaskList.appendChild(taskItem);
    } else {
        actionBtn.textContent = 'Complete';
        actionBtn.style.backgroundColor = '#28a745'; // Green
        actionBtn.addEventListener('click', function() {
            taskItem.classList.add('completed');
            completedTaskList.appendChild(taskItem);
            pendingTaskList.removeChild(taskItem);
        });
        pendingTaskList.appendChild(taskItem);
    }

    updateBtn.textContent = 'Update';
    updateBtn.style.backgroundColor = '#007bff'; // Blue
    updateBtn.addEventListener('click', function() {
        taskInput.value = taskName;
        descriptionInput.value = taskDescription;
        deadlineInput.value = taskDeadline;
        taskItem.remove(); // Remove the current task item
    });

    // Append elements to the task item
    taskItem.appendChild(taskNameElem);
    taskItem.appendChild(taskDeadlineElem);
    taskItem.appendChild(taskDescriptionElem);
    taskItem.appendChild(actionBtn);
    taskItem.appendChild(updateBtn);

    return taskItem;
}

// Add event listener to the add task button
addTaskBtn.addEventListener('click', function() {
    const taskName = taskInput.value.trim();
    const taskDescription = descriptionInput.value.trim();
    const taskDeadline = deadlineInput.value;

    if (taskName) {
        const today = new Date();
        const deadlineDate = new Date(taskDeadline);

        if (deadlineDate < today) {
            // Task is overdue
            completedTaskList.appendChild(createTaskItem(taskName, taskDescription, taskDeadline, true));
        } else if (today.toDateString() === deadlineDate.toDateString()) {
            // Task is due today, keep in pending
            pendingTaskList.appendChild(createTaskItem(taskName, taskDescription, taskDeadline));
        } else {
            // Task is pending
            pendingTaskList.appendChild(createTaskItem(taskName, taskDescription, taskDeadline));
        }

        // Clear input fields after adding the task
        taskInput.value = '';
        descriptionInput.value = '';
        deadlineInput.value = '';
    } else {
        alert('Please enter a task name!');
    }
});
