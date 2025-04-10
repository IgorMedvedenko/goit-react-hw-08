import React from "react";
import AppBar from "./AppBar/AppBar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}
