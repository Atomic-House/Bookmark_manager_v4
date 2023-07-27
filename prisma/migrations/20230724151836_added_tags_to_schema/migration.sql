/*
  Warnings:

  - You are about to drop the column `defaultWs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "color" SET DEFAULT 'slategray';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultWs";

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "listType" TEXT,
    "defaultWs" TEXT,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
