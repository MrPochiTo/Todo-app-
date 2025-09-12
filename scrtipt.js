import { saveTodosIntoLocalStorage,getTodosIntoLocalStorage  } from "./utils.js";

const addTodoInput = document.querySelector("[data-add-todo-input]");
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const todoContainer = document.querySelector('[data-todo-container]');
const todoTemplate = document.querySelector('[data-todo-template]');
const searchTodoInput = document.querySelector('[data-search-todo-input]');


let todoList = getTodosIntoLocalStorage() 
addTodoBtn.addEventListener('click', () => {
    if(addTodoInput.value.trim()) {
        const newTodo = {
            id: Date.now(),
            text: addTodoInput.value.trim(),
            completed: false,
            createdAt: new Date(),
        }
        todoList.push(newTodo);
        saveTodosIntoLocalStorage(todoList);
        renderTodos()
    }
})

const creatTodoLayout = (todo) => {
    const todoElement = document.importNode(todoTemplate.content, true)

    const checkbox = todoElement.querySelector('[data-todo-checkbox')
    checkbox.checked = todo.completed;

    const todoText = todoElement.querySelector('[data-todo-text]');

    todoText.textContent  = todo.text;

    const todoDate = todoElement.querySelector('[data-todo-date]');

    todoDate.textContent = todo.createdAt;

    const removeTodoBtn = todoElement.querySelector('[remove-todo-btn]');

    removeTodoBtn.disabled = !todo.completed;


    
    checkbox.addEventListener('change' , (e) => {
        todoList = todoList.map((t) =>
        {
            if(t.id === todo.id ) {
                t.completed = e.target.checked
            }
            return t
        })
        saveTodosIntoLocalStorage(todoList);
        renderTodos()
    })
    
    removeTodoBtn.addEventListener('click', () => {
        todoList = todoList.filter((t) =>
        {
            if(t.id !== todo.id ) {
                return t
            }
        })
        saveTodosIntoLocalStorage(todoList);
        renderTodos()
    })
    return todoElement
}

const renderTodos = () => {
    todoContainer.innerHTML = '';

    if(todoList.length === 0) {
        todoContainer.innerHTML = "<h3>Нет задач</h3>"
    }

    todoList.forEach((todo,i) => {
        let todoElement = creatTodoLayout(todo);
        todoContainer.append(todoElement);
    });
}

const removeToDo = (i) => {
    todoList.slice(i,1)
    saveTodosIntoLocalStorage(todoList)
    renderTodos()
}

renderTodos()