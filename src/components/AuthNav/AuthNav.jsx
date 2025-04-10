import React from "react";
import { NavLink } from "react-router";
import styles from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Log In
      </NavLink>
    </div>
  );
}
