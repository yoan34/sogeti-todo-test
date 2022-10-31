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

  const todosCompleted = todos.filter(todo => todo.completed ? true : false);
  const todoNotCompleted = todos.filter(todo => todo.completed ? false : true);

  return (
    <>
        <div className='app'>
          <h1>List des todos</h1>
          <div className='app-todos'>
            {todoNotCompleted && todoNotCompleted.map(todo => <Todo key={todo.id} {...todo} />)}
            {todosCompleted && todosCompleted.map(todo => <Todo key={todo.id} {...todo} />)}
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


