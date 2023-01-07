import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../App";
import classes from "./MyTask.module.css";

export default function TaskItem(props) {
  const el = props.el;
  const [edit, setEdit] = useState(false);
  const taskEditRef = useRef();
  const token = useSelector((state) => state.token);

  const updateTaskHandler = (event, text, completed = false) => {
    fetch(`${backendURL}/task/update-task/${event.target.id}`, {
      method: "PATCH",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        completed,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // window.location.reload();
      });
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (edit && !el.completed) {
      const text = taskEditRef.current.value;
      if (text.trim().length === 0) {
        return;
      } else {
        updateTaskHandler(event, text);
      }
      taskEditRef.current.value = "";
    }
    setEdit(!edit);
  };

  const taskDoneHandler = (event) => {
    event.preventDefault();
    if (!el.completed) {
      updateTaskHandler(event, el.text, true);
    } else {
      fetch(`${backendURL}/task/delete/${event.target.id}`, {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // window.location.reload();
        });
    }
  };

  return (
    <div
      className={`alert ${classes.item}`}
      style={{ backgroundColor: `${el.completed ? "#41d8bf" : ""}` }}
    >
      <h3 style={{ textDecoration: `${el.completed ? "line-through" : ""}` }}>
        {el.text}
      </h3>

      <p>{new Date(el.updatedAt).toLocaleString()}</p>
      {edit && !el.completed && (
        <input
          className={classes.edit}
          type="text"
          required
          ref={taskEditRef}
        />
      )}
      <br />
      <div className={classes.buttonHolder}>
        <button className={classes.button} id={el._id} onClick={editHandler}>
          {edit && !el.completed ? "Save" : "Edit"}
        </button>
        <button
          onClick={taskDoneHandler}
          id={el._id}
          className={classes.btnDelete}
        >
          {!el.completed ? "Done" : "Delete"}
        </button>
      </div>
    </div>
  );
}
