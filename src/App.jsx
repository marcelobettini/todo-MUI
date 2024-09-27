import "./App.css";

import { useState } from "react";
import Task from "./components/Task";
function App() {
  const [tasks, setTasks] = useState([]);
  const handleAddTask = (e) => {
    e.preventDefault();
    const addTaskForm = new FormData(e.target);
    const newTask = {
      id: crypto.randomUUID(),
      description: addTaskForm.get("taskDescription"),
      isCompleted: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
    e.target.reset();
  };

  const changeStatus = (id) => {
    const newState = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      } else {
        return task;
      }
    });

    // const newState = tasks.map((task) =>
    //   task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    // );
    setTasks(newState);
  };
  return (
    <div className="container">
      <header>
        <h1>Lista de tareas</h1>
      </header>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          name="taskDescription"
          placeholder="Add a description..."
          aria-label="Task description"
        />
        <input type="submit" value="Add" />
      </form>

      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onChangeStatus={(id) => changeStatus(id)}
        />
      ))}
    </div>
  );
}

export default App;
