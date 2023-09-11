import { relations } from "drizzle-orm";
import { pgTable, text, boolean } from "drizzle-orm/pg-core";
import { list } from "./list";

export const bookmark = pgTable("bookmark", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	url: text("url").$type<URL | null>(),
	listId: text("listId"),
	title: text("title"),
	description: text("description"),
	favicon: text("favicon").$type<URL | null>(),
	preview: text("preview").$type<URL | null>(),
	isDeleted: boolean("isDeleted").default(false)
})

export const bookmarkToListRelation = relations(bookmark, ({ one }) => ({
	list: one(list, {
		fields: [bookmark.listId],
		references: [list.id]
	})
}))
export type Bookmark = typeof bookmark.$inferInsert
