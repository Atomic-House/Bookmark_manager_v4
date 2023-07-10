-- AlterTable
ALTER TABLE "List" ADD COLUMN     "tabId" TEXT;

-- CreateTable
CREATE TABLE "Tab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tab" ADD CONSTRAINT "Tab_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "Tab"("id") ON DELETE SET NULL ON UPDATE CASCADE;
