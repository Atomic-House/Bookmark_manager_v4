ALTER TABLE "view" RENAME COLUMN "isDeleted" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "view" RENAME COLUMN "boardId" TO "board_id";--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "inbox_id" text;--> statement-breakpoint
ALTER TABLE "view" DROP COLUMN IF EXISTS "inboxId";