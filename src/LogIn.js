import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "./App";
import { saveToken, setEmail, setName } from "./slice";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch(`${backendURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(saveToken(data.token));
        dispatch(setName(data.user.name));
        dispatch(setEmail(data.user.email));
        navigate("/mytask");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <form onSubmit={logInHandler}>
      <h1>Login</h1>
      <p>Enter User Email</p>
      <input type="email" ref={emailRef} required />
      <p>Enter User Password</p>
      <input type="password" ref={passwordRef} required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
