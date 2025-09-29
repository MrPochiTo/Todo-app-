export const TODOS_KEY = 'todos'
export const SCORE_KEY = 'score'

export const saveTodosIntoLocalStorage  = (key,todos)=> {
        localStorage.setItem(key, JSON.stringify(todos))
}

export const getTodosIntoLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || []

export const getDateRepresente = (date) => Intl.DateTimeFormat("ru-RU", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
}).format()