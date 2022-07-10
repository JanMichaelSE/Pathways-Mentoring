/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_mentorId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "mentorId";
