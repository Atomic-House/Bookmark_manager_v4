/*
  Warnings:

  - The primary key for the `UserPreferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("userId");
