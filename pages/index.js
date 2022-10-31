import { useState, useEffect } from 'react';
import { createServer } from 'miragejs';

import Todo from '../components/Todo';


createServer({
  routes() {
    this.get("api/todos", () => ({
      todos: [
        { id: 1, title: "lire livre mike horn", completed: false, description: "" },
        { id: 2, title: "faire 2h du vélo", completed: false, description: "" },
        { id: 3, title: "faire les course", completed: true, description: "" },
        { id: 4, title: "finir le test sogeti", completed: false, description: "" },
      ]
    }))
  }
})


const fetchTodos = async (setTodos) => {
  const response = await fetch("/api/todos");
  const data = await response.json();
  setTodos(data.todos)
}

export default function Home() {

  let [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos(setTodos);
  },  [fetchTodos])

  // sort the list by todo  not completed first and completed after.
  const todosSorted = todos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);

  const handleTodoCompleted = (id) => {
    // We retrieve the correct 'todo' and toggle the 'completed' property. After that, we create a new
    // list of todos without the selected todo. Finally, we push the updated todo and update the state of the 'todos'.
    const todo = todos.filter(todo => todo.id === id)[0];
    const updateTodo = { ...todo, completed: !todo.completed }
    const newTodos = todos.filter(todo => todo.id !== id);
    newTodos.push(updateTodo);
    setTodos(newTodos);
  }

  return (
    <>
        <div className='app'>
          <h1>List des todos</h1>
          <div className='app-todos'>
            {todosSorted &&
             todosSorted.map(todo => <Todo key={todo.id} {...todo} handleTodoCompleted={handleTodoCompleted} />)}
          </div>
        </div>
        <style jsx>
          {`
            .app, .app-todos {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
            h1 {

              font-family: Roboto;
              color: #004466ff;
              margin: 3rem 0;
            }
          `}
        </style>
    </>
  )
}


