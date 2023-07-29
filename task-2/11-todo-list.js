const todoList = [{ name: 'make a dinner', dueDate: '2023-12-22' }, {
    name: 'wash dishes',
    dueDate: '2023-12-23'
}];

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const { name, dueDate } = todoObject;
        const html = `
            <div class="names">${i+1}, ${name}</div
            <div class="dueDates">${dueDate}</div>
            <button class="edit-button">Edit</button>
            <button onclick= "
                todoList.splice(${i}, 1);
                renderTodoList();
                ">Delete
            </button>
        `;
        todoListHTML += html;

    }

    document.querySelector('.js-todo-list')
        .innerHTML = todoListHTML;

}

function addTodo() {
    const inpputElement = document.querySelector(`.js-name-input`);
    const name = inpputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        name,
        dueDate
    });

    console.log(todoList);

    inpputElement.value = '';

    renderTodoList();

}

function handleTododKeydown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// Get all edit buttons
const editButtons = document.querySelectorAll('.edit-button');

// Add event listener for each edit button
editButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        const listItem = event.target.parentNode;
        const task = listItem.querySelector('.names');

        // Toggle the "contenteditable" attribute to make it editable or non-editable
        task.contentEditable = !task.isContentEditable;

        // Apply styling for visual indication of editable state
        if (task.isContentEditable) {
            listItem.classList.add('editable');
            button.textContent = 'Save'; // Change button text to 'Save'
        } else {
            listItem.classList.remove('editable');
            button.textContent = 'Edit'; // Change button text back to 'Edit'
        }
    });
});