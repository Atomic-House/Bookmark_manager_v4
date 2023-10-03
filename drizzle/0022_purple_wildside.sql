DROP TABLE "listPrefs";--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "view_type" "listView" DEFAULT 'list';--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "sort_order" "sortOrder" DEFAULT 'newest';--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "link_type" "linkType" DEFAULT 'most';--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "tags" text;--> statement-breakpoint
ALTER TABLE "view" DROP COLUMN IF EXISTS "layout_id";