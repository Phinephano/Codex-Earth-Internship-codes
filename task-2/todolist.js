const todoList = [

];

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, dueDate, editable } = todoObject;
        const taskNumber = i + 1;
        const html = `
      <div class="todo-item">
        <div class="names" ${editable ? 'contenteditable' : ''}>${taskNumber}, ${name}</div>
        <div class="dueDates" ${editable ? 'contenteditable' : ''}>${dueDate}</div>
        <button class="edit-button">${editable ? 'Save' : 'Edit'}</button>
        <button class="delete-button" onclick="deleteTodo(${i})">Delete</button>
      </div>
    `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    // Get all edit buttons
    const editButtons = document.querySelectorAll('.edit-button');

    // Add event listener for each edit button
    editButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            toggleEditMode(index);
        });
    });
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        name,
        dueDate,
        editable: false
    });

    inputElement.value = '';
    dateInputElement.value = '';

    renderTodoList();
}

function handleTododKeydown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}


function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function toggleEditMode(index) {
    const todoItem = todoList[index];
    const listItem = document.querySelector('.todo-item:nth-child(' + (index + 1) + ')');
    const nameElement = listItem.querySelector('.names');
    const dueDateElement = listItem.querySelector('.dueDates');

    if (todoItem.editable) {
        todoItem.name = nameElement.textContent;
        todoItem.dueDate = dueDateElement.textContent;
    }

    todoItem.editable = !todoItem.editable;
    renderTodoList();
}