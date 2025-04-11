import { createSlice, createSelector } from "@reduxjs/toolkit";

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
