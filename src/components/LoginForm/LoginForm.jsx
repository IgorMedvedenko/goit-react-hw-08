import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useNavigate } from "react-router";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate("/contacts");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label} htmlFor="email">
          Email
          <Field
            type="email"
            id="email"
            name="email"
            className={styles.input}
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </label>
        <label className={styles.label} htmlFor="password">
          Password
          <Field
            type="password"
            id="password"
            name="password"
            className={styles.input}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </label>
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </Form>
    </Formik>
  );
}
