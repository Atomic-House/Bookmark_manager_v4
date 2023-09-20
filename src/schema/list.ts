import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Bookmark, bookmark } from "./bookmarks";
import { createId } from "@paralleldrive/cuid2";
export const list = pgTable("list", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name"),
  boardId: text("board_id"),
  viewId: text("view_id"),
  inboxId: text("inbox_id"),
  isDeleted: boolean("isDeleted").default(false),
  icon: text("icon").$type<string | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export const listToBookmarkRelation = relations(list, ({ many }) => ({
  bookmarks: many(bookmark),
}));
export type List = typeof list.$inferInsert;

export interface ListWithBookmarks extends List {
  bookmarks: Bookmark[];
}
