ALTER TABLE "board" ADD COLUMN "createdBy" text;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "created_by" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_createdBy_user_email_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace" ADD CONSTRAINT "workspace_created_by_user_email_fk" FOREIGN KEY ("created_by") REFERENCES "user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
