import { createContext, useContext, useState } from "react";


const TodoContext = createContext();


export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filter, setFilter] = useState("ALL"); 
  const [darkMode, setDarkMode] = useState(false); 


  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

 
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const filteredTodos = todos
    .filter((todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "COMPLETED") return todo.completed;
      if (filter === "INCOMPLETE") return !todo.completed;
      return true; // "ALL"
    });


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addTodo,
        deleteTodo,
        toggleComplete,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook to use Todo Context
export const useTodo = () => useContext(TodoContext);
