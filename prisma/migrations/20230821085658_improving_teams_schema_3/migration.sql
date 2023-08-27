-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_teamId_fkey";

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "teamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
