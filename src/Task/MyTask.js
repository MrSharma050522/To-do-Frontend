import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import classes from "./MyTask.module.css";
import TaskItem from "./TaskItem";

export default function MyTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const token = useSelector((state) => state.token);

  const getAllTask = () => {
    if (!token) {
      navigate("/login");
    }
    fetch(`${backendURL}/task/mytask`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  };

  useEffect(() => {
    console.log("here");
    getAllTask();
  });

  return (
    <div className={classes.div}>
      {tasks.map((el) => (
        <TaskItem key={el._id} el={el} />
      ))}
    </div>
  );
}
