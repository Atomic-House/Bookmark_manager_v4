"use client";
import { createContext, Dispatch, SetStateAction } from "react";
//Interface for  list display preferences for each tab panels
export interface ListPrefs {
  sort?: "a_z" | "z_a" | "newest" | "oldest";
  filter?: {
    tags: string[];
    linksType: string[];
  };
  view?: "list" | "card" | "icon";
}
export const ListPrefContext = createContext<{
  listPrefs: ListPrefs | undefined;
  setListPrefs: Dispatch<SetStateAction<ListPrefs | undefined>>;
}>({
  listPrefs: {
    sort: "newest",
    filter: {
      tags: [],
      linksType: [],
    },
    view: "list",
  },
  setListPrefs: () => {},
});
