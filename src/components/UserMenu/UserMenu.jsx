import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import { selectUser } from "../../redux/auth/authSelectors";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}
