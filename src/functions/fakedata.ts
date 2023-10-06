import { Board } from "@/schema/board";
import { Bookmark } from "@/schema/bookmarks";
import { ViewWithLists } from "@/schema/view";
import { Workspace } from "@/schema/workspace";
import { faker } from "@faker-js/faker";
import { ListWithBookmarks } from "@/schema/list";
import { User } from "@/schema/auth";
export function fakerUser(length: number): User[] {
  let users: User[] = [];
  for (let i = 0; i < length; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      id: faker.database.mongodbObjectId(),
      image: faker.image.avatar(),
      emailVerified: faker.date.past(),
      profileId: faker.database.mongodbObjectId(),
    });
  }
  return users;
}
export function fakerWorkspaces(length: number) {
  let ws: Workspace[] = [];
  for (let i = 0; i < length; i++) {
    ws.push({
      name: faker.company.name(),
      id: faker.database.mongodbObjectId(),
      icon: faker.image.avatar(),
    });
  }
  return ws;
}
export function fakerBoards(length: number) {
  let boards: Board[] = [];

  for (let i = 0; i < length; i++) {
    boards.push({
      name: faker.science.unit().name,
      id: faker.database.mongodbObjectId(),
      icon: faker.image.avatar(),
      isDeleted: false,
      hasAccess: [],
      createdBy: faker.database.mongodbObjectId(),
      createdAt: faker.date.past(),
      workspaceId: faker.database.mongodbObjectId(),
    });
  }
  return boards;
}
export function fakeBookmarks(length: number): Bookmark[] {
  let bookmarks: Bookmark[] = [];
  for (let i = 0; i < length; i++) {
    bookmarks.push({
      name: faker.science.unit().name,
      id: faker.database.mongodbObjectId(),
      url: faker.internet.url(),
      favicon: faker.image.avatar(),
      preview: faker.image.avatarGitHub(),
      isDeleted: false,
      title: faker.internet.displayName(),
      description: faker.lorem.paragraph(),
    });
  }

  return bookmarks;
}
export function fakeView(length: number): ViewWithLists[] {
  let views: ViewWithLists[] = [];
  for (let i = 0; i < length; i++) {
    views.push({
      id: faker.database.mongodbObjectId(),
      name: faker.company.name(),
      lists: fakeLists(5),
    });
  }
  return views;
}

export function fakeLists(length: number): ListWithBookmarks[] {
  let lists: ListWithBookmarks[] = [];
  for (let i = 0; i < length; i++) {
    lists.push({
      id: faker.database.mongodbObjectId(),
      name: faker.company.name(),
      bookmarks: fakeBookmarks(8),
    });
  }
  return lists;
}
