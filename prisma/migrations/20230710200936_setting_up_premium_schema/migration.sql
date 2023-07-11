-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_tabId_fkey";

-- AlterTable
ALTER TABLE "Tab" ADD COLUMN     "inboxId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPremiumUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Inbox" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tab" ADD CONSTRAINT "Tab_inboxId_fkey" FOREIGN KEY ("inboxId") REFERENCES "Inbox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "Tab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
