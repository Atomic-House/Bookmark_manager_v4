import { timestamp, pgTable, text, } from "drizzle-orm/pg-core";
import { board } from "./board";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const workspace = pgTable("workspace", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  userId: text("userId"),
  icon: text("icon").$type<string | null>(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const workspaceToBoardRelations = relations(
  workspace, ({ many }) => ({ boards: many(board) })
)

export const userToWorkspaceRelations = relations(users, ({ many }) => ({
  workspaces: many(workspace)
}))

export const workspaceToUserRelations = relations(workspace, ({ one }) => ({
  user: one(users, {
    fields: [workspace.userId],
    references: [users.id]
  })
}))
export type Workspace = typeof workspace.$inferInsert
