import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "./App";
import { saveToken, setEmail, setName } from "./slice";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch(`${backendURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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
    <form onSubmit={registerHandler}>
      <h1>Register</h1>
      <p>Enter User Name</p>
      <input type="text" ref={nameRef} required />
      <p>Enter User Email</p>
      <input type="email" ref={emailRef} required />
      <p>Enter User Password</p>
      <input type="password" ref={passwordRef} required />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
