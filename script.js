// Selecting necessary DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const deadlineInput = document.getElementById('deadline-input');
const pendingTaskList = document.getElementById('pending-task-list');
const completedTaskList = document.getElementById('completed-task-list');

// Function to create task item
function createTaskItem(taskName, taskDescription, taskDeadline, isCompleted = false, isOverdue = false) {
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
    const deleteBtn = document.createElement('button');

    // Complete action button behavior
    if (isCompleted) {
        actionBtn.textContent = 'Completed';
        actionBtn.style.backgroundColor = '#EB8317';
        completedTaskList.appendChild(taskItem);
    } else {
        actionBtn.textContent = 'Complete';
        actionBtn.style.backgroundColor = '#28a745'; // Green
        actionBtn.addEventListener('click', function() {
            taskItem.classList.add('completed');
            completedTaskList.appendChild(taskItem);
            actionBtn.textContent = 'Completed';
            actionBtn.style.backgroundColor = '#EB8317';
            pendingTaskList.removeChild(taskItem);
        });
        pendingTaskList.appendChild(taskItem);
    }

    // Update button behavior
    updateBtn.textContent = 'Update';
    updateBtn.style.backgroundColor = '#007bff'; // Blue
    updateBtn.style.marginLeft = '20px'; // 20px space
    updateBtn.addEventListener('click', function() {
        taskInput.value = taskName;
        descriptionInput.value = taskDescription;
        deadlineInput.value = taskDeadline;
        taskItem.remove(); // Remove the current task item
    });

    // Delete button behavior
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = '#dc3545'; // Red
    deleteBtn.style.marginLeft = '20px'; // 20px space
    deleteBtn.addEventListener('click', function() {
        taskItem.remove(); // Remove the task item
    });

    // Append elements to the task item
    taskItem.appendChild(taskNameElem);
    taskItem.appendChild(taskDeadlineElem);
    taskItem.appendChild(taskDescriptionElem);
    taskItem.appendChild(actionBtn);
    taskItem.appendChild(updateBtn);
    taskItem.appendChild(deleteBtn); // Append the delete button

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

// Selecting necessary DOM elements
const profileLink = document.querySelector('.dropdown-menu li a[href="#"]'); // Target "Your Profile"
const accountInfo = document.getElementById('account-info');
const overlay = document.createElement('div');

// Create and style overlay
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Show the account info block when "Your Profile" is clicked
profileLink.addEventListener('click', function (e) {
    e.preventDefault();
    accountInfo.classList.remove('hidden');
    overlay.style.display = 'block';
});

// Hide the account info block when the overlay is clicked
overlay.addEventListener('click', function () {
    accountInfo.classList.add('hidden');
    overlay.style.display = 'none';
});

const profileAvatar = document.getElementById('profile-avatar');
const dropdownMenu = document.getElementById('profile-dropdown');

// Toggle the 'hidden' class when the avatar is clicked
profileAvatar.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(e) {
    // If the click is outside the profile avatar and the dropdown menu, close it
    if (!profileAvatar.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');  // Ensure the dropdown is hidden when clicked outside
    }
});

function contact(){
    alert("The query has been sent to the admin \n Contact admin for more information");
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}