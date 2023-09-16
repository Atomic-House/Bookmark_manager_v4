ALTER TABLE "bookmark" ADD COLUMN "create_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "snoozeEnabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "snoozeTime" timestamp with time zone;