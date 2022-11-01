import { useContext, useRef, useState } from 'react';
import Link from "next/link";
import { addTodo } from '../../src/api';
import { TodosContext } from '../../src/todosProvider';



export default function AddTodo() {

  const titleRef = useRef();
  const {todos, setTodos, newId, setNewId} = useContext(TodosContext); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleFocus = () => {
    titleRef.current.style.border = '1px solid black';
    titleRef.current.style.color = 'black';
    titleRef.current.placeholder = '';
  }

  const handleCreateTodo = async () => {
    if (!title) {
      titleRef.current.style.border = '1px solid red';
      titleRef.current.style.color = 'red';
      titleRef.current.placeholder = 'Enter a title.';
      return;
    }
    const todo = {id: newId.toString(), title, description, completed: false};
    await addTodo(todo, todos, setTodos);
    setTitle('');
    setDescription('');
    setNewId(newId+1);
  }

  return (
    <>
        <div className='add-todo'>
          <Link href={'/'} legacyBehavior><a className="home-link">back</a></Link>
          <h1 className='title'>Create a todo</h1>
          <div className='input-title'>
            <label>Title:</label>
            <input
              type='text'
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className='input-description'>
            <label>Description:</label>
            <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='btn-add' onClick={handleCreateTodo}>CREATE</div>
        </div>
        <style jsx>
          {`
            .add-todo {
              display: flex;
              flex-direction: column;
              width: 100%;
              align-items: center;
            }
            .title {
              font-family: Roboto;
              color: #004466ff;
            }
            .input-title, .input-description {
              width: 100%;
              display: flex;
              flex-direction: column;
              max-width: 400px;
            }
            .input-title input, .input-description textarea {
              border-radius: 4px;
              border: 1px solid gray;
              font-family: Roboto;
              font-size: 1rem;
              height: 24px;
            }
            .input-description textarea {
              height: 60px;
            }
            .input-title label, .input-description label {
              font-family: Roboto;

            }
            .input-description {
              margin-top: 30px;
            }
            .btn-add {
              position: relative;
              width: 100%;
              padding: 10px 0;
              overflow: hidden;
              text-align: center;
              max-width: 400px;
              font-family: Roboto;
              color: white;
              background-color: #fbb817;
              font-weight: 600;
              margin-top: 20px;
              border-radius: 6px;
              transition: all 1s;
              cursor: pointer;
              box-shadow: 8px 8px 10px #e0e0e0;
              text-decoration: none;
            }
            .btn-add:before {
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
            .btn-add:hover:before {
              transform: translateX(100%) skew(45deg) rotate(60deg) ;
            }

            .home-link {
              text-decoration: none;
              width: fit-content;
              padding: 8px 16px;
              background-color: #004466ff;
              font-family: Roboto;
              margin-top: 40px;
              margin-bottom: 20px;
              color: white;
              border-radius: 6px;
          }
  
          `}
        </style>
    </>
  )
}


