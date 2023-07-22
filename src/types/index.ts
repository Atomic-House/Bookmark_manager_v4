import { Board, Bookmark, List, Tab, User, Workspace } from "@prisma/client";

export interface ListsWithBookmarks extends List {
  bookmarks: Bookmark[];
}
export interface TabWithLists extends Tab {
  lists: ListsWithBookmarks[];
}

export interface BoardWithTabs extends Board {
  tabs: TabWithLists[];
}

export interface WorkspaceWithBoards extends Workspace {
  boards: BoardWithTabs[];
}
export interface UserWithWorkspace extends User {
  workspace: WorkspaceWithBoards[];
}
