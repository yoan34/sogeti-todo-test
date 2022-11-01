import { useContext } from 'react';

import Todo from '../components/Todo';
import { TodosContext } from '../src/todosProvider';



export default function Home() {

  const {todos, loading} = useContext(TodosContext); 

  // sort the list by todo  not completed first and completed after.
  const todosSorted = todos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);

  return (
    <>
        <div className='app'>
          <h1>List des todos</h1>
          <div className='app-todos'>
            {!loading ?
              todosSorted.map(todo => <Todo key={todo.id}  {...todo} />)
              : <h2>Loading...</h2>
            }
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


