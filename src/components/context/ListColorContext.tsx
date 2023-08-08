//Context for list color to be shared between list component and panel component
"use client";
import { Dispatch, SetStateAction, createContext } from "react";

export const ListColorContext = createContext<{
  listColor: string;
  setListColor: Dispatch<SetStateAction<string>>;
}>({ listColor: "", setListColor: () => {} });
