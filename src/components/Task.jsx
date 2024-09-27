import React from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";

function Task({ id, description, isCompleted, onChangeStatus }) {
  return (
    <ListItemButton onClick={onChangeStatus}>
      <ListItemText
        style={{ width: "350px" }}
        primary={description}
        secondary={
          <Typography
            component="span"
            sx={{
              color: isCompleted ? "red" : "green",
            }}
          >
            {isCompleted ? "completa" : "pendiente"}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default Task;
