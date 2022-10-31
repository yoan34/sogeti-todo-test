import { useState, useEffect } from 'react';
import { createServer } from 'miragejs';


createServer({
  routes() {
    this.get("api/todos", () => ({
      todos: [
        { id: 1, title: "lire livre mike horn", completed: false },
        { id: 2, title: "faire 2h du vélo", completed: false },
        { id: 3, title: "faire les course", completed: true },
        { id: 4, title: "finir le test sogeti", completed: false },
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

  console.log(todos)

  return (
    <>
        <div className='app'>

        </div>
        <style jsx>
          {`
            .app {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
          `}
        </style>
    </>
  )
}


