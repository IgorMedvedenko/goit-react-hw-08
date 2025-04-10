import { createSlice, createSelector } from "@reduxjs/toolkit";

// const initialState = {
//   name: "",
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     changeFilter(state, action) {
//       state.name = action.payload;
//     },
//   },
// });

// export const { changeFilter } = filtersSlice.actions;
// export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

// export default filtersSlice.reducer;
