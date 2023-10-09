import { text, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { board } from "./board";
import { relations } from "drizzle-orm";
import { users } from "./auth";
export const team = pgTable("team", {
  id: text("id").$defaultFn(() => createId()),
  name: text("name").notNull(),
  boardId: text("boardId").references(() => board.id),
});
const teamToMembersRelation = relations(team, ({ many }) => ({
  members: many(users),
}));
