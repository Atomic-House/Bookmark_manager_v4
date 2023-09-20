import { Dispatch, SetStateAction, createContext } from "react";

export const WorkspaceContext = createContext<{
  defaultWorkspaceId: string | undefined;
  setDefault: Dispatch<SetStateAction<string | undefined>>;
}>({
  defaultWorkspaceId: "",
  setDefault: () => {},
});
