//Typedefs 
import { Board, Bookmark, List, Tab, User, Workspace } from "@prisma/client";

export interface ListsWithBookmarks extends List {
  bookmarks: Bookmark[];
}
export interface TabWithLists extends Tab {
  lists: ListsWithBookmarks[];
}
export interface InboxWithTabs extends TabWithLists {
  tabs: TabWithLists[];
}
export interface BoardWithTabs extends Board {
  tabs: TabWithLists[];
}

export interface WorkspaceWithBoards extends Workspace {
  boards: BoardWithTabs[];
  inbox: InboxWithTabs;
}
export interface UserWithWorkspace extends User {
  workspace: WorkspaceWithBoards[];
}
