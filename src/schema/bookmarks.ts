import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { list } from "./list";
import { inbox } from "./inbox";
import { createId } from "@paralleldrive/cuid2";
export const bookmark = pgTable("bookmark", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name"),
  url: text("url").$type<URL | string | null>().notNull(),
  listId: text("listId"),
  title: text("title"),
  description: text("description"),
  favicon: text("favicon").$type<URL | string | undefined>(),
  preview: text("preview").$type<URL | string | undefined>(),
  isDeleted: boolean("isDeleted").default(false),
  createdBy: text("created_by"),
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

export const bookmarksToInboxRelation = relations(bookmark, ({ one }) => ({
  inbox: one(inbox, {
    fields: [bookmark.inboxId],
    references: [inbox.id],
  }),
}));

export type Bookmark = typeof bookmark.$inferInsert;
