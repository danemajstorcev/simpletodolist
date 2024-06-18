import React, { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  crossed: boolean;
}

const App: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const [todosList, setTodosList] = useState<Todo[]>([
    {
      id: 0,
      title: "Clean room",
      crossed: false,
    },
    {
      id: 1,
      title: "Go to the gym",
      crossed: false,
    },
    {
      id: 2,
      title: "learn javascript",
      crossed: false,
    },
  ]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleDone = (id: number) => {
    setTodosList(
      todosList.map((todo) =>
        todo.id === id ? { ...todo, crossed: !todo.crossed } : todo
      )
    );
  };

  const deleteToDo = (id: number) => {
    setTodosList(todosList.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: todosList.length > 0 ? todosList[todosList.length - 1].id + 1 : 0,
        title: newTodo,
        crossed: false,
      };
      setTodosList([...todosList, newTodoItem]);
      setNewTodo("");  
    }
  };

  return (
    <div id="container" className="App">
      <h1>
        To-Do List
        <i
          className={`fa fa-toggle-${isToggled ? "off" : "on"}`}
          id="kopce"
          aria-hidden="true"
          onClick={handleToggle}
        ></i>
      </h1>
      <input
        className={`${isToggled ? "hideInput" : ""}`}
        type="text"
        placeholder="Add New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ul>
        {todosList.map((toDo) => (
          <li
            onClick={() => handleDone(toDo.id)}
            className={`el ${toDo.crossed ? "crossed" : ""}`}
            key={toDo.id}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                deleteToDo(toDo.id);
              }}
              className="trash"
            >
              <i className="fa fa-trash"></i>
            </span>
            {toDo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
