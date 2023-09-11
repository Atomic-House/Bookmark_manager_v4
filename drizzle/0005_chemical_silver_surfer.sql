DO $$ BEGIN
 CREATE TYPE "linkType" AS ENUM('most', 'broken', 'duplicate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "listView" AS ENUM('list', 'card', 'icon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('owner', 'admin', 'member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sortOrder" AS ENUM('a_z', 'z_a', 'newest', 'oldest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listPrefs" (
	"id" text PRIMARY KEY NOT NULL,
	"viewType" "listView" DEFAULT 'list',
	"sortOrder" "sortOrder" DEFAULT 'newest',
	"linkType" "linkType" DEFAULT 'most',
	"tags" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "view" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"isDeleted" boolean DEFAULT false,
	"boardId" text,
	"inboxId" text
);
--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "isDeleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "icon" text;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "favicon" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "preview" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "isDeleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "list" ADD COLUMN "viewId" text;--> statement-breakpoint
ALTER TABLE "list" ADD COLUMN "isDeleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "list" ADD COLUMN "icon" text;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "icon" text;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;