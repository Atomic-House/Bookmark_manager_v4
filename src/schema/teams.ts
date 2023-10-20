import { text, pgTable, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { users } from "./auth";
export const teams = pgTable("team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  createdBy: text("createdBy"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const usersRelation = relations(users, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));
export const teamsRelation = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));

export const usersToTeams = pgTable(
  "usersToTeams",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.teamId),
  }),
);

export const usersToTeamsRelation = relations(usersToTeams, ({ one }) => ({
  team: one(teams, {
    fields: [usersToTeams.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [usersToTeams.userId],
    references: [users.id],
  }),
}));

export type Team = typeof teams.$inferSelect;
export type UsersToTeams = typeof usersToTeams.$inferSelect;
