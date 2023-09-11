import { pgTable,text } from "drizzle-orm/pg-core";

export const member = pgTable("member",{
	id: text("id").notNull().primaryKey(),
	workspaceId: text("workspaceId"),
})
