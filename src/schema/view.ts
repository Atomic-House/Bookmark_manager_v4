import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { List, list } from "./list";
import { board } from "./board";
import { inbox } from "./inbox";
import { layout } from "./layout";

export const view = pgTable("view", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  isDeleted: boolean("is_deleted").default(false),
  boardId: text("board_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  layoutId: text("layout_id"),
});
export const viewToLayoutRelation = relations(view, ({ one }) => ({
  layout: one(layout, {
    fields: [view.layoutId],
    references: [layout.id],
  }),
}));
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
