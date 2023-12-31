import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { View, ViewWithLists, view } from "./view";
import { createId } from "@paralleldrive/cuid2";
import { User } from "./auth";
//board schema
export const board = pgTable("board", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").$type<string>().notNull(),
  workspaceId: text("workspaceId"),
  isDeleted: boolean("isDeleted").default(false),
  hasAccess: text("access").$type<string[] | null>(),
  icon: text("icon").$type<string | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: text("createdBy"),
});
//Workspace to boards -> many to one
export const boardToWorkspace = relations(board, ({ one }) => ({
  workspace: one(workspace, {
    fields: [board.workspaceId],
    references: [workspace.id],
  }),
}));
//Board to list -> many to one
export const boardToViewsRelation = relations(board, ({ many }) => ({
  views: many(view),
}));

export type Board = typeof board.$inferSelect;
export interface BoardWithViews extends Board {
  views: ViewWithLists[];
}
