//
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  height: 768,
  width: 1536,
};
const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
  },
});


export const { setWidth, setHeight } = screenSlice.actions;

export default screenSlice.reducer;
