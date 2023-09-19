import { pgTable, text } from "drizzle-orm/pg-core";
import { linkTypeEnum, listViewEnum, sortOrderEnum } from "./enums";
import { relations } from "drizzle-orm";
import { view } from "./view";
import { createId } from "@paralleldrive/cuid2";
export const layout = pgTable("listPrefs", {
  id: text("id").$defaultFn(() => createId()),
  viewType: listViewEnum("viewType").default("list"),
  sortOrder: sortOrderEnum("sortOrder").default("newest"),
  linkType: linkTypeEnum("linkType").default("most"),
  tags: text("tags").$type<string[]>(),
  viewId: text("view_id"),
});
export const layoutToView = relations(layout, ({ one }) => ({
  view: one(view, {
    fields: [layout.viewId],
    references: [view.id],
  }),
}));

export type Layout = typeof layout.$inferInsert;
