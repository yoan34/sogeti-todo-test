
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';


export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  const data = await response.json();
  return data;
}

export const fetchTodo = async (id, setTodo) => {
  const response = await fetch(`${API_URL}/todos/${id}`);
  const todo = await response.json();
  setTodo(todo)
}

export const updateTodo = async (id, todo, todos, setTodos) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  const newTodo = await response.json();
  const newTodos = todos.map(t => t.id === id ? newTodo : t)
  setTodos(newTodos);
  
  return newTodo;
}

export const addTodo = async (todo, todos, setTodos) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  const newTodo = await response.json();
  setTodos([...todos, newTodo])
}

