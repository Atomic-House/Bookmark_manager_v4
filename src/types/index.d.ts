export interface Workspace {
  name: string;
  id: string;
  email: string;
  boards: Boards[]?;
}
export interface Boards {
  name: string;
  id: string;
  wsId: string;
  lists: Lists[]?;
  isDeleted: boolean;
}
export interface TabsInterface {
  name: string;
  id: string;
  boardId: string?;
  lists: Lists[]?;
  isDeleted: boolean;
}
export interface Lists {
  name: string;
  id: string;
  boardId: string?;
  tasks: Bookmarks[]?;
  isDeleted: boolean;
}
export interface Bookmarks {
  name: string?;
  isDeleted: boolean;
  id: string;
  listId: string?;
  url: string | URL;
  title: string?;
  description: string?;
}
