import React from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";

export default function ContactsPage() {
  return (
    <div>
      <h2>Contacts</h2>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
