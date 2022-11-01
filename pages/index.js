import { useContext } from 'react';
import Link from "next/link";
import Todo from '../components/Todo';
import { TodosContext } from '../src/todosProvider';



export default function Home() {

  const {todos, loading} = useContext(TodosContext); 

  // sort the list by todo  not completed first and completed after.
  let todosNotCompleted = todos.filter(todo => todo.completed ? false : true);
  let todosCompleted = todos.filter(todo => todo.completed ? true : false);
  todosNotCompleted = todosNotCompleted.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? false : true);
  todosCompleted = todosCompleted.sort((a, b) => parseInt(a.id) > parseInt(b.id));

  const todosSorted = todos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);

  return (
    <>
        <div className='app'>
          <h1>List des todos</h1>
          <div className='app-todos'>
            {!loading ?
              todosNotCompleted.concat(todosCompleted).map(todo => <Todo key={todo.id}  {...todo} />)
              : <h2>Loading...</h2>
            }
          </div>
          <Link href='/todo/add' legacyBehavior>
            <a className='add-todo'>ADD</a>
          </Link>
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
            .add-todo {
              position: relative;
              width: 100%;
              padding: 10px 0;
              overflow: hidden;
              text-align: center;
              max-width: 500px;
              font-family: Roboto;
              color: white;
              background-color: #fbb817;
              font-weight: 600;
              margin: 10px 0;
              border-radius: 6px;
              transition: all 1s;
              cursor: pointer;
              box-shadow: 8px 8px 10px #e0e0e0;
              text-decoration: none;
            }
            .add-todo:before {
              content: '';
              position: absolute;
              width: 100%;
              height: 30px;
              top: 0;
              left: 0;
              background-color: white;
              transform: translateX(-100%) skew(45deg) rotate(60deg);
              transition: all 0.5s ease-in-out;
            }
            .add-todo:hover:before {
              transform: translateX(100%) skew(45deg) rotate(60deg) ;
            }
          `}
        </style>
    </>
  )
}


