import { Dispatch, SetStateAction, createContext } from "react";

export const IconContext = createContext<{
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}>({
  icon: "",
  setIcon: () => {},
});
