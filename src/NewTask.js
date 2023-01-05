import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "./App";

export default function NewTask() {
  const taskRef = useRef();
  const token = useSelector((state) => state.token);

  const addTaskHandler = (event) => {
    event.preventDefault();
    const text = taskRef.current.value;
    fetch(`${backendURL}/task/addtask`, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <form onSubmit={addTaskHandler}>
        <h1>Create New Task</h1>
        <p>Enter Task</p>
        <input type="text" required ref={taskRef} />
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
