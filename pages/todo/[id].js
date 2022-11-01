import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { fetchTodo, updateTodo } from "../../src/api";
import { TodosContext } from "../../src/todosProvider";


const TodoItem = () => {

  const { todos, setTodos } = useContext(TodosContext);
  const router = useRouter()
  const id = router.query.id;

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchTodo(id, setTodo)
      setLoading(false);
    }
  }, [id])


  const handleUpdateTodo = async (id, name) => {
    let newTodo;
    if (name === 'COMPLETED') newTodo = { ...todo, completed: !todo.completed }
    if (name === 'DESCRIPTION') newTodo = { ...todo, description: todo.description }
    const updatedTodo = await updateTodo(id, newTodo, todos, setTodos);
    setTodo(updatedTodo);
  }
  
  return (
    <>
      <div className="todo-item">
        <Link href={'/'} legacyBehavior><a className="home-link">Back</a></Link>
        <div className="todo">
          {todo && !loading ? 
          <div>
            <h2 className="todo-title">{todo.title}</h2>
            <input type={'checkbox'} checked={todo.completed} onChange={() => handleUpdateTodo(id, "COMPLETED")} />
            <label>{todo.completed ? 'This todo is completed.': "This todo is incompleted."}</label>
            <p className="label-description">description:</p>
            <textarea
              className="todo-description"
              type='text'
              value={todo.description}
              onChange={(event) => setTodo({ ...todo, description: event.target.value })}
            />
            <button className="btn-update" onClick={() => handleUpdateTodo(id, "DESCRIPTION")}>Update</button>
          </div>
          : <h2>Loading...</h2>}
        </div>
      </div>
      <style jsx>
        {`
          .home-link {
            text-decoration: none;
            width: fit-content;
            padding: 8px 16px;
            background-color: #004466ff;
            font-family: Roboto;
            
            color: white;
            border-radius: 6px;
            margin-bottom: 10px;
          }
          .btn-update {
            padding: 6px 16px;
            background-color: #fbb817;
            border: none;
            border-radius: 6px;
            color: white;
            font-family: Roboto;
            cursor: pointer;
          }
          .todo {
            width: 100%;
            max-width: 600px;
          }
          .todo-title {
            font-family: Roboto;
            font-size: 36px;
            color: #004466ff;
          }
          .todo-item {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .label-description {
            margin-top: 30px;
          }
          .todo-description {
            width: 100%;
            height: 100px;
            resize: vertical;
          }
        `}
      </style>
    </>
  )
}

export default TodoItem;