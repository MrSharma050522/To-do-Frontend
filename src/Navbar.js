import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveToken, setName } from "./slice";

export default function Navbar() {
  const userName = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();
    dispatch(saveToken(""));
    dispatch(setName(""));
    navigate("/login");
  };

  return (
    <header>
      <ul>
        <li>Hello {userName || "Guest"} </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        {!userName && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/mytask">All Task</NavLink>
        </li>
        <li>
          <button onClick={logoutUser}>Logout</button>
        </li>
      </ul>
    </header>
  );
}
