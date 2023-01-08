import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import { saveToken, setEmail, setName } from "../Store/slice";
import classes from "./Form.module.css";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    fetch(`${backendURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch(saveToken(data.token));
        dispatch(setName(data.user.name));
        dispatch(setEmail(data.user.email));
        navigate("/mytask");
        setLoading(false);
      })
      .catch((err) => alert("This email is not registered!"));
  };
  return (
    <div className={classes.div}>
      {loading && <Spinner variant="info" />}
      <form onSubmit={logInHandler}>
        <h1>Login</h1>
        <label htmlFor="email">Enter User Email</label>
        <input type="email" ref={emailRef} required />
        <label htmlFor="password">Enter User Password</label>
        <input type="password" ref={passwordRef} required />
        <br />
        <button className={classes.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
