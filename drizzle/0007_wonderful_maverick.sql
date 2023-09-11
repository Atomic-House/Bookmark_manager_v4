CREATE TABLE IF NOT EXISTS "member" (
	"id" text PRIMARY KEY NOT NULL,
	"workspaceId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"default_default_ws_id" text,
	"user_name" text,
	"user_id" text,
	"is_premium_user" boolean DEFAULT false,
	"background" text
);
