import { Inbox } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: { array: any[]; id: string; inboxId: string } = {
  array: [],
  id: "",
  inboxId: "",
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
    setInboxId: (state, action: PayloadAction<string>) => {
      state.inboxId = action.payload;
    },
  },
});

export const { setArray, setId, setInboxId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
