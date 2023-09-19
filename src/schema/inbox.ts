import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { bookmark } from "./bookmarks";
import { createId } from "@paralleldrive/cuid2";
export const inbox = pgTable("inbox", {
  id: text("id").$defaultFn(() => createId()),
  workspaceId: text("workspaceId"),
});
export const inboxToWorkspaceRelation = relations(inbox, ({ one }) => ({
  workspace: one(workspace, {
    fields: [inbox.workspaceId],
    references: [workspace.id],
  }),
}));
export const inboxToBookmarksRelation = relations(inbox, ({ many }) => ({
  bookmarks: many(bookmark),
}));

export type Inbox = typeof inbox.$inferInsert;
