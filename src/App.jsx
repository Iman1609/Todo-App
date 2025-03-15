import { TodoProvider } from "./context/TodoContext.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;