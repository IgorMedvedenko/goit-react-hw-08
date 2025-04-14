import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { refreshUser } from "../../redux/auth/operations";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";
import Layout from "../Layout";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

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
