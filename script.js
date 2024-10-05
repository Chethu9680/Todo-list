// Selecting necessary DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const taskList = document.getElementById('task-list');

// Add event listener to the add task button
addTaskBtn.addEventListener('click', function() {
    const taskName = taskInput.value.trim();
    const taskDeadline = deadlineInput.value;

    // Ensure the task name is not empty
    if (taskName) {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        
        // Add task name and deadline to the task item
        taskItem.innerHTML = `<span>${taskName} ${taskDeadline ? '- Deadline: ' + taskDeadline : ''}</span>`;

        // Compare the deadline with the current date
        const today = new Date();
        const deadlineDate = new Date(taskDeadline);

        // Create the button element based on whether the deadline is over or not
        const actionBtn = document.createElement('button');
        
        if (taskDeadline && deadlineDate < today) {
            // Deadline has passed: Task is marked as 'Not Submitted' and displayed in red
            actionBtn.textContent = 'Deadline-Over';
            actionBtn.style.backgroundColor = '#dc3545'; // Red color
            taskItem.style.backgroundColor = '#f8d7da'; // Light red background for the task
        } else {
            // Deadline hasn't passed or no deadline: Task is 'Completed' with green background when clicked
            actionBtn.textContent = 'Completed';
            actionBtn.style.backgroundColor = '#28a745'; // Green button
            
            // Event listener for marking the task as completed
            actionBtn.addEventListener('click', function() {
                taskItem.classList.add('completed');
            });
        }

        // Append the button to the task item
        taskItem.appendChild(actionBtn);

        // Add task item to the task list
        taskList.appendChild(taskItem);

        // Clear input fields after adding the task
        taskInput.value = '';
        deadlineInput.value = '';
    } else {
        alert('Please enter a task name!');
    }
});
