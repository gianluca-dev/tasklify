let tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {tasks.forEach(task => displayTask(task));});

document.getElementById('add-button').addEventListener('click', addTask);

function addTask() {
    // get value of input element
    let value = document.getElementById('input').value.trim();
    if (value) {
        // push value into localStorage
        tasks.push(value);
        // display tasks
        displayTask(value);
        // clear inputelement
        document.getElementById('input').value = '';
        saveTask();
    } // alert for incorrect inputs
}

function displayTask(value) {
    let newTask = document.createElement('li');
    newTask.textContent = value;
    newTask.className = 'task-item';
    // create deleteButton
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    // check if deleteButton is clicked
    deleteButton.addEventListener('click', deleteTask);
    // attach deleteButton to newTask
    newTask.appendChild(deleteButton);
    // attach newTask to taskList
    let list = document.getElementById('list');
    list.appendChild(newTask);
}

function deleteTask(event) {
    // get task to delete
    let taskItem = event.target.parentElement;
    let taskText = taskItem.firstChild.textContent.trim();
    // get taskList
    let list = document.getElementById('list');
    // remove task
    list.removeChild(taskItem);
    // remove task from tasks array
    tasks = tasks.filter(task => task !== taskText);
    // update localStorage
    saveTask();
}

function saveTask() {
    // save tasks in localStorage
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}
