import { Layout } from "@/schema/layout";
import { Dispatch, SetStateAction, createContext } from "react";

export const LayoutContext = createContext<{
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout | undefined>>;
}>({
  layout: {
    id: "",
    viewId: "",
    viewType: "list",
    linkType: "most",
    sortOrder: "newest",
  },
  setLayout: () => {},
});
