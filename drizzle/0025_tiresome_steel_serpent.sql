CREATE TABLE IF NOT EXISTS "team" (
	"id" text,
	"name" text NOT NULL,
	"workspace" text
);
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'member'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "member" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "teamId" text;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "role" text DEFAULT 'member';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "workspaceId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
