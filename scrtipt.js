import { saveTodosIntoLocalStorage,getTodosIntoLocalStorage,getDateRepresente  } from "./utils.js";
import { SCORE_KEY, TODOS_KEY } from "./utils.js";

const switchBackgroundColor = () => {
    header.classList.toggle('header-black')
    document.body.classList.toggle('body-black')
}

const filterListAndRender = (searchValue) => {
    filterTodoList = todoList.filter((t) => t.text.toLowerCase().includes(searchValue))
    renderFilterTodos()
}

const renderTodos = () => {
    todoContainer.innerHTML = '';

    if(todoList.length === 0) {
        todoContainer.innerHTML = "<h3 class='information'>Нет задач</h3>"
        return;
    }
    todoList.forEach((todo,i) => {
        let todoElement = creatTodoLayout(todo);
        todoContainer.append(todoElement);
    });
}

const renderFilterTodos = () => {
    todoContainer.innerHTML = '';

    if(filterTodoList.length === 0) {
        todoContainer.innerHTML = "<h3 class='information'>Задачи не найдены</h3>"
        return;
    }

    filterTodoList.forEach((todo,i) => {
        let todoElement = creatTodoLayout(todo);
        todoContainer.append(todoElement);
    });
}

const removeToDo = (i) => {
    todoList.slice(i,1)
    saveTodosIntoLocalStorage(TODOS_KEY,todoList)
    renderTodos()
}

const addTodoInput = document.querySelector("[data-add-todo-input]");
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const todoContainer = document.querySelector('[data-todo-container]');
const todoTemplate = document.querySelector('[data-todo-template]');
const searchTodoInput = document.querySelector('[data-search-todo-input]');
const switchBtn = document.querySelector('[data-header-switch]')
const header = document.querySelector('[data-header]')

let todoList = getTodosIntoLocalStorage(TODOS_KEY) 
let filterTodoList = []

switchBtn.addEventListener('click', () => {
    switchBtn.classList.toggle("switch-on");
    switchBackgroundColor();
})

const creatTodoLayout = (todo) => {
    const todoElement = document.importNode(todoTemplate.content, true)

    const checkbox = todoElement.querySelector('[data-todo-checkbox')
    checkbox.checked = todo.completed;

    const todoText = todoElement.querySelector('[data-todo-text]');

    todoText.textContent  = todo.text;

    const todoDate = todoElement.querySelector('[data-todo-date]');

    todoDate.textContent = todo.createdAt

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
        saveTodosIntoLocalStorage(TODOS_KEY,todoList);

        if(searchTodoInput.value.trim()){
            filterListAndRender(searchTodoInput.value.trim())
        } else {
            renderTodos()
        }
    })
    
    removeTodoBtn.addEventListener('click', () => {
        todoList = todoList.filter((t) =>
        {
            if(t.id !== todo.id ) {
                return t
            }
        })
        saveTodosIntoLocalStorage(TODOS_KEY,todoList);
        if(searchTodoInput.value.trim()){
            filterListAndRender(searchTodoInput.value.trim())
        } else {
            renderTodos()
        }
    })
    return todoElement
}

addTodoBtn.addEventListener('click', () => {
    if(addTodoInput.value.trim()) {
        const newTodo = {
            id: Date.now(),
            text: addTodoInput.value.trim(),
            completed: false,
            createdAt: getDateRepresente(new Date()),
        }
        addTodoInput.value = '';
        todoList.push(newTodo);
        saveTodosIntoLocalStorage(TODOS_KEY,todoList);
        renderTodos()
    }
})


searchTodoInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    filterListAndRender(searchValue)
})

addTodoInput.addEventListener('keydown' ,(e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        addTodoBtn.click();
        e.target.value = '';
    }
})




renderTodos()

