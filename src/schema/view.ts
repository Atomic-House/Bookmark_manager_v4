import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { List, list } from "./list";
import { board } from "./board";
import { createId } from "@paralleldrive/cuid2";
import { layoutEnum } from "./enums";

export const view = pgTable("view", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  isDeleted: boolean("is_deleted").default(false),
  boardId: text("board_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  viewType: layoutEnum("view_type").default("list"),
  tags: text("tags").$type<string[]>(),
});

export const viewToListsRelation = relations(view, ({ many }) => ({
  lists: many(list),
}));
export const listToViewRelation = relations(list, ({ one }) => ({
  view: one(view, {
    fields: [list.viewId],
    references: [view.id],
  }),
}));

export const viewToBoardRelation = relations(view, ({ one }) => ({
  board: one(board, {
    references: [board.id],
    fields: [view.boardId],
  }),
}));
export type View = typeof view.$inferInsert;

export interface ViewWithLists extends View {
  lists: List[];
}
