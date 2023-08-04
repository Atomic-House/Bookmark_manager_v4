/*
  Warnings:

  - You are about to drop the column `inboxId` on the `Workspace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inbox" DROP CONSTRAINT "Inbox_workspaceId_fkey";

-- AlterTable
ALTER TABLE "Inbox" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "inboxId";

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
