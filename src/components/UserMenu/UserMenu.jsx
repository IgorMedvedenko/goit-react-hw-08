import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      <span className={styles.usermenu}>Welcome, {user.name}</span>
      <button className={styles.button} onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </div>
  );
}
