import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSelectors";

export default function RestrictedRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/contacts" /> : <Outlet />;
}
