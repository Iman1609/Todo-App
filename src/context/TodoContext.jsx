import { createContext, useContext, useState } from "react";

// Create Context
const TodoContext = createContext();

// Context Provider
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]); // Todo list state
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [filter, setFilter] = useState("ALL"); // Filter state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Add Todo
  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Todo Completion
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Filter Todos based on Search and Filter
  const filteredTodos = todos
    .filter((todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "COMPLETED") return todo.completed;
      if (filter === "INCOMPLETE") return !todo.completed;
      return true; // "ALL"
    });

  // Toggle Dark Mode
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