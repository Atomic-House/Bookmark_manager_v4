ALTER TABLE "workspace" DROP CONSTRAINT "workspace_id_unique";--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "id" DROP DEFAULT;