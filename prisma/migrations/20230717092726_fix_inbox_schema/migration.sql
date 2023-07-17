-- DropForeignKey
ALTER TABLE "Inbox" DROP CONSTRAINT "Inbox_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tab" DROP CONSTRAINT "Tab_boardId_fkey";

-- AlterTable
ALTER TABLE "Inbox" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Inbox',
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tab" ALTER COLUMN "boardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tab" ADD CONSTRAINT "Tab_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
