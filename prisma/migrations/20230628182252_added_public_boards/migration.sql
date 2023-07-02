-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "email" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "email" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
