import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggleTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme= action.payload
    },
  },
});


export const { toggleTheme } = themeSlice.actions;
  
export default themeSlice.reducer;
