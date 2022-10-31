

export const Todo = ({ id, title, completed }) => {
  return (
    <>
      <div className="todo">
        <input
          className="todo-checkbox"
          type={'checkbox'}
        />
        <p>{title}</p>
      </div>
      <style jsx>
        {`
          .todo {
            display: flex;
            width: 100%;
            max-width: 500px;
            font-family: Roboto;
            text-decoration: ${completed ? 'line-through' : 'none'};
            font-weight: 500;
            color: ${completed ? 'gray' : 'black'};
            flex-direction: row;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid #eaeaea;
            box-shadow: 8px 8px 10px #c6c6c6;
;
          }
          .todo-checkbox {
            margin: 0 6px;
          }
        `}
      </style>
    </>
  )
}
  
  export default Todo;