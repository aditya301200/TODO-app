import { useEffect, useState } from "react";
import { TODOprovider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTODO = (todo) => {
    // Add todo to todos
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTODO = (id, todo) => {
    // Update todo
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
  };

  const deleteTODO = (id) => {
    // Delete todo
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    // Toggle todo complete
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TODOprovider
      value={{ todos, addTODO, updateTODO, toggleComplete, deleteTODO }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TODOprovider>
  );
};

export default App;
