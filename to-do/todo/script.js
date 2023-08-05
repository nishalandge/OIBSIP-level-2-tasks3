let tasks = [];

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    tasks.push({
        title: taskTitle,
        description: taskDescription,
        completed: false,
    });

    updateLists();
    document.getElementById('taskForm').reset();
}

function completeTask(index) {
    tasks[index].completed = true;
    updateLists();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLists();
}

function updateLists() {
    const taskListTable = document.getElementById('taskList');
    const pendingListTable = document.getElementById('pendingList');
    const completedListTable = document.getElementById('completedList');

    taskListTable.innerHTML = '';
    pendingListTable.innerHTML = '';
    completedListTable.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = createRow(task, index);
        if (task.completed) {
            completedListTable.appendChild(row);
        } else {
            taskListTable.appendChild(row);
        }
    });

    const pendingTasks = tasks.filter(task => !task.completed);
    pendingTasks.forEach((task, index) => {
        const row = createRow(task, index);
        pendingListTable.appendChild(row);
    });
}

function createRow(task, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td><button onclick="deleteTask(${index})">Delete</button></td>
        ${task.completed ? `<td>Completed</td>` : `<td><input type="checkbox" onchange="completeTask(${index})"></td>`}
    `;
    return row;
}

updateLists();

