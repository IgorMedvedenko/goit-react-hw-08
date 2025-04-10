import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { refreshUser } from "../../redux/auth/authOperations";
import {
  selectIsRefreshing,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import Layout from "../../components/Layout";
import PrivateRoute from "../../components/PrivateRoute";
import RestrictedRoute from "../../components/RestrictedRoute";
import HomePage from "../../pages/HomePage";
import RegistrationPage from "../../pages/RegistrationPage";
import LoginPage from "../../pages/LoginPage";
import ContactsPage from "../../pages/ContactsPage";
import clearContacts from "../../redux/contacts/contactsSlice";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (authError && authError.type === "SOME_ERROR_TYPE") {
      console.error("Authentication error:", authError.message);
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
