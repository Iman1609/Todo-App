import { useState } from "react";
import { useTodo } from "../context/TodoContext.jsx";

const TodoList = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    darkMode,
    toggleDarkMode,
  } = useTodo();

  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleAddTodo = () => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask("");
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-blue-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-4 sm:p-6 rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">TODO LIST</h1>
          <button
            onClick={toggleDarkMode}
            className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex flex-col sm:flex-row items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search note..."
            className={`w-full sm:flex-1 p-2 rounded-md border outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`w-full sm:w-auto p-2 rounded-md border outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          >
            <option value="ALL">ALL</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="INCOMPLETE">INCOMPLETE</option>
          </select>
        </div>

        {/* Todo List */}
        <ul className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No todos yet!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span
                    className={`text-sm sm:text-base flex-1 ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-inherit"
                    }`}
                  >
                    {todo.task}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 text-xs sm:text-sm px-2 py-1 rounded transition-colors duration-200"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
      >
        <span className="text-xl">+</span>
      </button>

      {/* Add Task Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div
            className={`p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-sm transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task..."
              className={`w-full p-2 mb-4 border rounded outline-none transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              }`}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;