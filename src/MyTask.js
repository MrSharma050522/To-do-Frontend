import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "./App";

export default function MyTask() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
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
        console.log(data);
        setTasks(data.tasks);
      });
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div>
      {tasks.map((el) => {
        return (
          <div key={el._id}>
            <h3>{el.text}</h3>
            <p>{new Date(el.createdAt).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
}
