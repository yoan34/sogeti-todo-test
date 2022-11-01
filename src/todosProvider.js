import { createContext, useEffect, useState } from "react";
import { fetchTodos } from "./api";

export const TodosContext = createContext({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider = ({ children }) => {

  const [todos, setTodos] = useState([]); 
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    const data = await fetchTodos();
    console.log(data)
    setTodos(data);
    setLoading(false);
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <TodosContext.Provider value={{ todos, loading, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}