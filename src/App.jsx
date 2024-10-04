import "./App.css";
import {
  Box,
  Button,
  List,
  TextField,
  Typography,
  ListItem,
} from "@mui/material";

import { useState, useEffect } from "react";
import Task from "./components/Task";
import { getTasksFromStorage } from "./services/getTasksFromStorage";

function App() {
  console.log("se monta el componente");
  const [tasks, setTasks] = useState(getTasksFromStorage());
  const handleAddTask = (e) => {
    e.preventDefault();
    const addTaskForm = new FormData(e.target);
    const description = addTaskForm.get("taskDescription");
    //si no escribimos nada en el input, retorna, evitando crear una tarea sin descripcion
    if (description === "") return;
    const newTask = {
      id: crypto.randomUUID(),
      description,
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
    //sintaxis corta con operador condicional ternario en vez de if, else...
    // const newState = tasks.map((task) =>
    //   task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    // );

    setTasks(newState);
  };

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <main className="container">
      <header>
        <Typography
          variant="h1"
          fontSize={44}
          color="info"
          marginBottom={"2rem"}
        >
          Lista de tareas
        </Typography>
      </header>

      <form onSubmit={handleAddTask}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width={"400px"}
        >
          <TextField
            label="Descripción"
            fullWidth
            autoFocus
            multiline
            name="taskDescription"
            placeholder="Aprender React..."
            aria-label="Task description"
          />
          <Button variant="outlined" type="submit">
            agregar
          </Button>
        </Box>
      </form>
      <section>
        {tasks.length ? (
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <Task {...task} onChangeStatus={() => changeStatus(task.id)} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography marginTop={"3rem"} fontSize={24} color="warning">
            No hay tareas
          </Typography>
        )}
      </section>
    </main>
  );
}

export default App;
