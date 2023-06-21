import type { AppDispatch, RootState } from "./store";
import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
