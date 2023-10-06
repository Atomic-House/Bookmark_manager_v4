ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "list" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "view" DROP COLUMN IF EXISTS "sort_order";--> statement-breakpoint
ALTER TABLE "view" DROP COLUMN IF EXISTS "link_type";