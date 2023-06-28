import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: { array: any[]; id: string } = {
  array: [],
  id: "",
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setArray: (state, action: PayloadAction<any[]>) => {
      state.array = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setArray, setId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
