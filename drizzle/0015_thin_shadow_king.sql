ALTER TABLE "list" RENAME COLUMN "boardId" TO "board_id";--> statement-breakpoint
ALTER TABLE "list" RENAME COLUMN "viewId" TO "view_id";--> statement-breakpoint
ALTER TABLE "list" RENAME COLUMN "inboxId" TO "inbox_id";--> statement-breakpoint
ALTER TABLE "bookmark" ALTER COLUMN "url" SET NOT NULL;