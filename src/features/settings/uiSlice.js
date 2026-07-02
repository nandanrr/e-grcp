import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  compactLayout: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },

    toggleCompactLayout: (state) => {
      state.compactLayout = !state.compactLayout;
    },

    setCompactLayout: (state, action) => {
      state.compactLayout = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleCompactLayout,
  setCompactLayout,
} = uiSlice.actions;

export default uiSlice.reducer;