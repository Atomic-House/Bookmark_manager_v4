//Context to be used to share data and state between list and @type Bookmarks
"use client";
import { createContext, Dispatch, SetStateAction } from "react";
//Interface for  list display preferences for each tab panels
import { $Enums, ListPrefs } from "@prisma/client";
export const ListPrefContext = createContext<{
  listPrefs: ListPrefs | undefined;
  setListPrefs: Dispatch<SetStateAction<ListPrefs | undefined>>;
}>({
  listPrefs: {
    id: "",
    sort: $Enums.Sort.NEWEST,
    tags: [],
    linkType: $Enums.Link.MOST,
    view: $Enums.View.LIST,
  },
  setListPrefs: () => {},
});
