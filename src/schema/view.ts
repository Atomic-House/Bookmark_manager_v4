import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { list } from "./list";
import { board } from "./board";
import { inbox } from "./inbox";
import { layout } from "./layout";

export const view = pgTable("view", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	isDeleted: boolean("isDeleted").default(false),
	boardId: text("boardId"),
	inboxId: text("inboxId"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
	,
	layoutId: text("layout_id")

})
export const viewToLayoutRelation = relations(view, ({ one }) => ({
	layout: one(layout, {
		fields: [view.layoutId],
		references: [layout.id]
	})
}))
export const viewToListsRelation = relations(view, ({ many }) => ({
	lists: many(list)
}))
export const listToViewRelation = relations(list, ({ one }) => ({
	view: one(view, {
		fields: [list.viewId],
		references: [view.id]
	})
}))

export const viewToBoardRelation = relations(view, ({ one }) => ({
	board: one(board, {
		references: [board.id],
		fields: [view.boardId]
	})
}))
export const viewToInboxRelation = relations(view, ({ one }) => ({
	inbox: one(inbox, {
		references: [inbox.id],
		fields: [view.inboxId]
	})
}))

export type View = typeof view.$inferInsert
