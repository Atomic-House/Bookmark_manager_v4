import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/slices/themeSlice";
import screenReducer from "@/slices/screenSlice";
import workspaceReducer from "@/slices/workspaceSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    screen: screenReducer,
    workspace: workspaceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
