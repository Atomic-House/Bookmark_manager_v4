import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { bookmark } from "./bookmarks";

export const list = pgTable("list", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	boardId: text("boardId"),
	viewId:text("viewId"),
	inboxId: text("inboxId"),
	isDeleted: boolean("isDeleted").default(false),
	icon: text("icon").$type<string | null>()
	,
	createdAt:timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
})
export const listToBookmarkRelation = relations(list, ({ many }) => ({
	bookmarks: many(bookmark)
}))
export type List = typeof list.$inferInsert
