import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { refreshUser } from "../../redux/auth/authOperations";
import {
  selectIsRefreshing,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import Layout from "../Layout";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import HomePage from "../../pages/HomePage";
import RegistrationPage from "../../pages/RegistrationPage";
import LoginPage from "../../pages/LoginPage";
import ContactsPage from "../../pages/ContactsPage";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.error("Authentication error:", authError);
      alert("Authentication error. Please try again.");
    }
  }, [authError]);

  return isRefreshing ? (
    <div>Refreshing User...</div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/contacts" />}
        >
          <Route index element={<RegistrationPage />} />
        </Route>
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" />}
        >
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/contacts" element={<PrivateRoute redirectTo="/login" />}>
          <Route index element={<ContactsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
