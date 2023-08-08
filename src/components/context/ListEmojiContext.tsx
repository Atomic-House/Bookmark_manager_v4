//Emoji context for list icons
"use client";
import { Dispatch, SetStateAction, createContext } from "react";

export const ListEmojiContext = createContext<{
  listEmoji: string;
  setListEmoji: Dispatch<SetStateAction<string>>;
}>({ listEmoji: "", setListEmoji: () => {} });
