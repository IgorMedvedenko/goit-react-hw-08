import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import { useNavigate } from "react-router";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be no more than 50 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        if (error?.code === 11000) {
          setRegistrationError("Ця електронна пошта вже зареєстрована.");
        } else {
          setRegistrationError(error.message);
        }
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label className={styles.label} htmlFor="name">
            Name
            <Field type="text" id="name" name="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label} htmlFor="email">
            Email
            <Field
              type="email"
              id="email"
              name="email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
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
            Register
          </button>
        </Form>
      </Formik>
      {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
    </div>
  );
}
