DROP TABLE "team";--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "member_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "member_teamId_team_id_fk";
--> statement-breakpoint
ALTER TABLE "member" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "workspaceId" text;--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "teamId";--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "role";