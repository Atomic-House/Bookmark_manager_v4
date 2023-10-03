import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as auth from "@/schema/auth";
import * as workspace from "@/schema/workspace";
import * as board from "@/schema/board";
import * as view from "@/schema/view";
import * as list from "@/schema/list";
import * as inbox from "@/schema/inbox";
import * as bookmarks from "@/schema/bookmarks";
import * as profile from "@/schema/profile";
import * as enums from "@/schema/enums";
declare module global {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

let postgresSqlClient;

const databaseUrl = process.env.DATABASE_URL!;

if (process.env.NODE_ENV !== "production") {
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(databaseUrl);
  }
  postgresSqlClient = global.postgresSqlClient;
} else {
  postgresSqlClient = postgres(databaseUrl);
}

export const db = drizzle(postgresSqlClient, {
  schema: {
    ...auth,
    ...workspace,
    ...board,
    ...view,
    ...list,
    ...inbox,
    ...bookmarks,
    ...profile,
    ...enums,
  },
});
