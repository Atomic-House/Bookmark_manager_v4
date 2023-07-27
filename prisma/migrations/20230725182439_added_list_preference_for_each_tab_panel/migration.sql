/*
  Warnings:

  - You are about to drop the column `background` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPremiumUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[listPrefId]` on the table `Tab` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Sort" AS ENUM ('A_Z', 'Z_A', 'NEWEST', 'OLDEST');

-- CreateEnum
CREATE TYPE "View" AS ENUM ('LIST', 'CARD', 'ICON');

-- CreateEnum
CREATE TYPE "Link" AS ENUM ('MOST', 'BROKEN', 'DUPLICATE');

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "Tab" ADD COLUMN     "listPrefId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "background",
DROP COLUMN "isPremiumUser",
DROP COLUMN "userName";

-- DropTable
DROP TABLE "Preferences";

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "listType" TEXT,
    "defaultWs" TEXT,
    "isPremiumUser" BOOLEAN NOT NULL DEFAULT false,
    "userName" TEXT,
    "background" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" TEXT NOT NULL,
    "tags" TEXT[],
    "link" "Link",

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListPrefs" (
    "id" TEXT NOT NULL,
    "view" "View",
    "sort" "Sort",
    "filterId" TEXT,

    CONSTRAINT "ListPrefs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userName_key" ON "UserPreferences"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ListPrefs_filterId_key" ON "ListPrefs"("filterId");

-- CreateIndex
CREATE UNIQUE INDEX "Tab_listPrefId_key" ON "Tab"("listPrefId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListPrefs" ADD CONSTRAINT "ListPrefs_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "Filter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tab" ADD CONSTRAINT "Tab_listPrefId_fkey" FOREIGN KEY ("listPrefId") REFERENCES "ListPrefs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
