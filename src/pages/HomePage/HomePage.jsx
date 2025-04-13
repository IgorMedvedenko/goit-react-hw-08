import React from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Phonebook App!</h1>
      <p className={styles.text}>
        This is a simple application for managing your contacts.
      </p>
    </div>
  );
}
