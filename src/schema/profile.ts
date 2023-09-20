import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { createId } from "@paralleldrive/cuid2";
export const profile = pgTable("profile", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  defaultWs: text("default_default_ws_id"),
  userName: text("user_name"),
  userId: text("user_id"),
  isPremiumUser: boolean("is_premium_user").default(false),
  background: text("background").$type<URL | null | undefined>(),
});

export const profileToUserRelations = relations(profile, ({ one }) => ({
  users: one(users, {
    references: [users.id],
    fields: [profile.userId],
  }),
}));

export const userToProfileRelations = relations(users, ({ one }) => ({
  profile: one(profile, {
    fields: [users.profileId],
    references: [profile.id],
  }),
}));
export type Profile = typeof profile.$inferInsert;
