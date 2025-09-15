
const TODOS_KEY = 'todos'

export const saveTodosIntoLocalStorage  = (todos)=> {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

export const getTodosIntoLocalStorage = () => JSON.parse(localStorage.getItem(TODOS_KEY)) || []

export const getDateRepresente = (date) => Intl.DateTimeFormat("ru-RU", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
}).format()