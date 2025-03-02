document.getElementById('add-button').addEventListener('click', addTask);

function addTask() {
    // get value of input element
    let taskValue = document.getElementById('task-input').value;
    // create new task
    let newTask = document.createElement('li');
    newTask.textContent = taskValue;
    // create deleteButton
    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    // check if deleteButton is clicked
    deleteButton.addEventListener('click', deleteTask);
    // attach deleteButton to newTask
    newTask.appendChild(deleteButton);
    // attach newTask to taskList
    let taskList = document.getElementById('task-list');
    taskList.appendChild(newTask);
    // clear inputelement
    document.getElementById('task-input').value = '';
}

function deleteTask(event) {
    // get task to delete
    let taskItem = event.target.parentElement;
    // get taskList
    let taskList = document.getElementById('task-list');
    // remove task
    taskList.removeChild(taskItem);
}