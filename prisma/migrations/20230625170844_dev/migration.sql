/*
  Warnings:

  - You are about to drop the column `userId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `List` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "userId";
