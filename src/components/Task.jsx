import React from "react";

function Task({ id, description, isCompleted, onChangeStatus }) {
  const changeIsCompleted = () => {
    onChangeStatus(id);
  };
  return (
    <article>
      <span>{id.slice(0, 5)}</span>
      <span> - </span>
      <span>{description}</span>
      <span> - </span>
      <span>{isCompleted ? "completa" : "pendiente"}</span>
      <button onClick={changeIsCompleted}>Toggle</button>
    </article>
  );
}

export default Task;
