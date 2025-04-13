import React from "react";
import { PiPhoneFill } from "react-icons/pi";
import { RiUserAddFill } from "react-icons/ri";
import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.item}>
      <p className={styles.text}>
        <span className={styles.contHolder}>
          <RiUserAddFill className={styles.icon} /> {name}
        </span>
        <span className={styles.contHolder}>
          <PiPhoneFill className={styles.icon} /> {number}
        </span>
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={handleDeleteContact}
      >
        Delete
      </button>
    </li>
  );
}
