ALTER TABLE "board" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "board" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "bookmark" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "inbox" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "inbox" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listPrefs" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "listPrefs" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "list" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "list" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "view" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "view" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "id" SET NOT NULL;