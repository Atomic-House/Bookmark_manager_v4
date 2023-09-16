import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { list } from "./list";
import { inbox } from "./inbox";

export const bookmark = pgTable("bookmark", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  url: text("url").$type<URL | string | null>(),
  listId: text("listId"),
  title: text("title"),
  description: text("description"),
  favicon: text("favicon").$type<URL | string | undefined>(),
  preview: text("preview").$type<URL | string | undefined>(),
  isDeleted: boolean("isDeleted").default(false),
  createdAt: timestamp("create_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  snoozeEnabled: boolean("snoozeEnabled").default(false),
  snoozeTime: timestamp("snoozeTime", { withTimezone: true }),
  inboxId: text("inbox_id"),
});

export const bookmarkToListRelation = relations(bookmark, ({ one }) => ({
  list: one(list, {
    fields: [bookmark.listId],
    references: [list.id],
  }),
}));

export const bookmarksToInboxRelation = relations(inbox, ({ one }) => ({
  inbox: one(bookmark, {
    fields: [inbox.id],
    references: [bookmark.inboxId],
  }),
}));

export type Bookmark = typeof bookmark.$inferInsert;
