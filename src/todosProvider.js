import { createContext, useEffect, useState } from "react";
import { fetchTodos } from "./api";

export const TodosContext = createContext({
  todos: [],
  setTodos: () => {},
  setNewId: () => {},
  newId: 0,
});

export const TodosProvider = ({ children }) => {

  const [todos, setTodos] = useState([]); 
  const [newId, setNewId] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    const data = await fetchTodos();
    setTodos(data);
    const ids = data.map(t => parseInt(t.id));
    console.log(ids)
    setNewId(Math.max(...ids) + 1);
    setLoading(false);
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <TodosContext.Provider value={{ todos, loading, setTodos, newId, setNewId }}>
      {children}
    </TodosContext.Provider>
  );
}