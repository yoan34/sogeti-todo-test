import Link from "next/link";
import { useContext } from "react";
import { updateTodo } from '../src/api';
import { TodosContext } from "../src/todosProvider";

export const Todo = ({ id, title, completed, description }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleUpdateTodo = async (id) => {
    const newTodo = { id, title, description, completed: !completed }
    await updateTodo(id, newTodo, todos, setTodos);
  }
  return (
    <>
      <div className="todo">
        <input
          className="todo-checkbox"
          type={'checkbox'}
          checked={completed}
          onChange={() => handleUpdateTodo(id, todos, setTodos)}
        />
         <Link href={`/todo/${id}`} legacyBehavior>
          <a className='todo-link'>{title}</a>
        </Link>
      </div>
      <style jsx>
        {`
          .todo {
            display: flex;
            width: 100%;
            max-width: 500px;
            font-family: Roboto;
            font-weight: 400;
            color: ${completed ? 'gray' : 'black'};
            flex-direction: row;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid #eaeaea;
            box-shadow: 8px 8px 10px #c6c6c6;
            transition: all 0.5s;
          }
          .todo:hover {
            background-color:  #f4f4f4 ;
          }
          .todo-checkbox {
            margin: 0 6px;
          }
          p {
            text-decoration: none;
            width: 100%;
          }
          .todo-link {
              padding: 10px 0;
              text-align: left;
              width: 100%;
              font-family: Roboto;
              font-weight: 400;
              text-decoration: ${completed ? 'line-through' : 'none'};
              color: ${completed ? 'gray' : 'black'};
            }
        `}
      </style>
    </>
  )
}
  
  export default Todo;