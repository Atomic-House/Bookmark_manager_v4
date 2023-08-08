//Redux store 

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/slices/themeSlice";
import screenReducer from "@/slices/screenSlice";
import workspaceReducer from "@/slices/workspaceSlice";
import userReducer from "@/slices/userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    screen: screenReducer,
    workspace: workspaceReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
