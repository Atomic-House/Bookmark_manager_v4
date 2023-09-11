CREATE TABLE IF NOT EXISTS "board" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"workspace_id" text,
	CONSTRAINT "board_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmark" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"listId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inbox" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"boardId" text,
	"inboxId" text
);
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_id_unique";--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP COLUMN IF EXISTS "icon";--> statement-breakpoint
ALTER TABLE "workspace" DROP COLUMN IF EXISTS "userId";