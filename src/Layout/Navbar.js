import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveToken, setName } from "../Store/slice";
import classes from "./Navbar.module.css";

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
    <nav className={`navbar ${classes.navstyle}`}>
      <h1 className={classes.h1}>Hello! {userName || "Guest"} </h1>
      <h2>Your Daily Planner</h2>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className={`nav-link ${classes.navLink}`} to="/login">
            <h4>Login</h4>
          </NavLink>
        </li>
        {!userName && (
          <li className="nav-item">
            <NavLink className={`nav-link ${classes.navLink}`} to="/register">
              <h4>Register</h4>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink className={`nav-link ${classes.navLink}`} to="/mytask">
            <h4>All Task</h4>
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            href="/"
            className={`nav-link ${classes.navLink}`}
            onClick={logoutUser}
          >
            <h4> Logout</h4>
          </a>
        </li>
      </ul>
    </nav>
  );
}
