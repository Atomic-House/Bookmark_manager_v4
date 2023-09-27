import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { Board, board } from "./board";
import { relations } from "drizzle-orm";
import { users } from "./auth";
import { createId } from "@paralleldrive/cuid2";
export const workspace = pgTable("workspace", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  createdBy: text("created_by"),
  icon: text("icon").$type<string | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const workspaceToBoardRelations = relations(workspace, ({ many }) => ({
  boards: many(board),
}));

export const userToWorkspaceRelations = relations(users, ({ many }) => ({
  workspaces: many(workspace),
}));

export const workspaceToUserRelations = relations(workspace, ({ one }) => ({
  user: one(users, {
    fields: [workspace.createdBy],
    references: [users.id],
  }),
}));
export type Workspace = typeof workspace.$inferInsert;


export interface WorkspaceAndBoards extends Workspace {
  boards?: Board[]
} 
