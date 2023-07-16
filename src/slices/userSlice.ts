import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  image: "",
  background: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
  },
});

export const { setImage, setBackground } = userSlice.actions;
export default userSlice.reducer;
