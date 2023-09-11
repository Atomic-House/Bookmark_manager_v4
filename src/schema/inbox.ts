import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { view } from "./view";
import { workspace } from "./workspace";
export const inbox = pgTable("inbox", {
	id: text("id").notNull().primaryKey(),
	workspaceId: text("workspaceId"),
})
export const inboxToWorkspaceRelation = relations(inbox, ({ one }) => ({
	workspace: one(workspace, {
		fields: [inbox.workspaceId],
		references: [workspace.id]
	})
}))
export const inboxToViewRelation = relations(inbox, ({ one }) => ({
	view: one(view, {
		fields: [inbox.id],
		references: [view.id]
	})

}))
export type Inbox = typeof inbox.$inferInsert
