/*
  Warnings:

  - You are about to drop the column `banner` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "banner",
ADD COLUMN     "background" TEXT;
