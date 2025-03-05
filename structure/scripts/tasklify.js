let tasks = JSON.parse(localStorage.getItem('Tasks')) || [];
let editMode = false;

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
    } else {
        alert('Please enter a valid task.');
    }
}

function displayTask(value) {
    // create newTask
    let newTask = document.createElement('li');
    newTask.className = 'task-item';
    newTask.textContent = value;
    // create editButton
    let editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button-invisible');
    editButton.addEventListener('click', () => editTask(newTask, value));
    // create saveButton
    let saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'save-button';
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-button-invisible');
    saveButton.addEventListener('click', () => saveEditedTask(newTask, value));
    // create deleteButton
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    // attach buttons to newTask
    newTask.appendChild(deleteButton);
    newTask.appendChild(editButton);
    newTask.appendChild(saveButton);
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

document.getElementById('menu').addEventListener('click', openMenu);
document.getElementById('close').addEventListener('click', closeMenu);

function openMenu() {
    document.getElementById('sideMenu').style.width = '250px';
}

function closeMenu() {
    document.getElementById('sideMenu').style.width = '0px';
}

document.getElementById('edit-button-menu').addEventListener('click', enterEditMode);

function enterEditMode() {
    editMode = !editMode;
    let list = document.getElementById('list');
    let editButton = list.querySelectorAll('button.edit-button');
    if (editMode) {
        editButton.forEach(button => button.classList.remove('edit-button-invisible'));
    } else {
        editButton.forEach(button => button.classList.add('edit-button-invisible'));
    }
}

function editTask(taskItem, oldValue) {
    let taskToEdit = taskItem;
    let editButton = taskToEdit.querySelector('button.edit-button');
    let saveButton = taskToEdit.querySelector('button.save-button');
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = oldValue;
    taskToEdit.appendChild(editInput);
    editButton.classList.add('edit-button-invisible');
    saveButton.classList.remove('save-button-invisible');
}    

function saveEditedTask(taskItem, oldValue) {
    let editInput = taskItem.querySelector('input.edit-input');
    let newValue = editInput.value.trim();
    let deleteButton = taskItem.querySelector('button.delete-button');
    let editButton = taskItem.querySelector('button.edit-button');
    let saveButton = taskItem.querySelector('button.save-button');
    if (newValue) {
        tasks = tasks.map(task => task === oldValue ? newValue : task);
        taskItem.textContent = newValue;
        saveTask();
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(saveButton);
        editButton.classList.remove('edit-button-invisible');
        saveButton.classList.add('edit-button-invisible');
    } else {
        alert('The task must not be empty.');
    }

}
