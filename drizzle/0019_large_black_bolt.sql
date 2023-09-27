ALTER TABLE "workspace" DROP CONSTRAINT "workspace_created_by_unique";--> statement-breakpoint
ALTER TABLE "workspace" DROP COLUMN IF EXISTS "userId";