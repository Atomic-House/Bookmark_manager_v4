import { Workspace } from "@/schema/workspace";
import { Dispatch, SetStateAction, createContext } from "react";

export const WorkspaceContext = createContext<{
  defaultWorkspace: Workspace | undefined;
  setDefault: Dispatch<SetStateAction<Workspace | undefined>>;
}>({
  defaultWorkspace: {
    name: "",
  },
  setDefault: () => {},
});
