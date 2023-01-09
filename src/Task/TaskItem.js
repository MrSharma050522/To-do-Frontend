import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../App";
import classes from "./MyTask.module.css";

export default function TaskItem(props) {
  const el = props.el;
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(el.completed);
  const [task, setTask] = useState(el.text);
  const [showTask, setShowTask] = useState(true);
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
      .then((data) => {});
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (edit && !done) {
      const text = taskEditRef.current.value;

      if (text.trim().length === 0) {
        return;
      } else {
        setTask(text);
        updateTaskHandler(event, text);
      }
      taskEditRef.current.value = "";
    }
    setEdit(!edit);
  };

  const taskDoneHandler = (event) => {
    event.preventDefault();
    if (!done) {
      updateTaskHandler(event, el.text, true);
      setDone(true);
    } else {
      setShowTask(false);
      fetch(`${backendURL}/task/delete/${event.target.id}`, {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTask(null);
        });
    }
  };

  const closeHandler = (event) => {
    event.preventDefault();
    setEdit(false);
  };

  return (
    <Fragment>
      {showTask && (
        <div
          className={`alert ${classes.item}`}
          style={{
            backgroundImage: `${
              done
                ? "radial-gradient(circle, #1dec09, #00e39d, #00d0f3, #00b5ff, #0091ff, #0091ff, #0092ff, #0092ff, #00b7ff, #00d3f1, #00e69b, #50f00a)"
                : ""
            }`,
          }}
        >
          <h3 style={{ textDecoration: `${done ? "line-through" : ""}` }}>
            {task}
          </h3>

          <p>{new Date(el.updatedAt).toLocaleString()}</p>
          {edit && !done && (
            <input
              className={classes.edit}
              type="text"
              required
              ref={taskEditRef}
            />
          )}
          <br />
          <div className={classes.buttonHolder}>
            <button
              className={classes.button}
              id={el._id}
              onClick={editHandler}
            >
              {edit && !done ? "Save" : "Edit"}
            </button>
            {edit && !done && (
              <button
                className={classes.button}
                id={el._id}
                onClick={closeHandler}
              >
                Cancel
              </button>
            )}
            <button
              onClick={taskDoneHandler}
              id={el._id}
              className={classes.btnDelete}
            >
              {!done ? "Done" : "Delete"}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
