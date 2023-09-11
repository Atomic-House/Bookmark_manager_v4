ALTER TABLE "inbox" ADD COLUMN "workspaceId" text;--> statement-breakpoint
ALTER TABLE "list" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "view" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;