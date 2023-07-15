/*
  Warnings:

  - You are about to drop the column `boardId` on the `List` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workspaceId]` on the table `Inbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workspaceId` to the `Inbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Inbox" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "boardId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Inbox_workspaceId_key" ON "Inbox"("workspaceId");

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
