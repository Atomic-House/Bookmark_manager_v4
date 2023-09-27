ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_created_by_unique" UNIQUE("created_by");