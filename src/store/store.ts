import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/slices/themeSlice";
import screenReducer from "@/slices/screenSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    screen: screenReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
