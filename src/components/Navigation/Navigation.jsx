import React from "react";
import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Contacts
      </NavLink>
    </nav>
  );
}
