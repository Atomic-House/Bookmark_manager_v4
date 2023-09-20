import { pgEnum } from "drizzle-orm/pg-core";
export const layoutEnum = pgEnum("listView", ["list", "card", "icon"]);
export const sortOrderEnum = pgEnum("sortOrder", [
  "a_z",
  "z_a",
  "newest",
  "oldest",
]);
export const linkTypeEnum = pgEnum("linkType", ["most", "broken", "duplicate"]);
export const rolesEnum = pgEnum("role", ["owner", "admin", "member"]);

export type LayoutEnum = "list" | "card" | "icon";
export type SortOrderEnum = "a_z" | "z_a" | "newest" | "oldest";
export type LinkTypeEnum = "most" | "broken" | "duplicate";
export type RolesEnum = "owner" | "admin" | "member";
