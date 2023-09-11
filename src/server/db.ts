import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as auth from "@/schema/auth"
import * as workspace from "@/schema/workspace"
import * as board from "@/schema/board"
import * as view from "@/schema/view"
import * as list from "@/schema/list"
import * as inbox from "@/schema/inbox"
import * as bookmarks from "@/schema/bookmarks"
import * as layout from "@/schema/layout"
import * as profile from "@/schema/profile"
export const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema: { ...auth, ...workspace, ...board, ...view, ...list, ...inbox, ...bookmarks, ...layout, ...profile } });
