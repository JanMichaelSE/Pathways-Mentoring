/*
  Warnings:

  - A unique constraint covering the columns `[mentorId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mentorId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "mentorId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_mentorId_key" ON "Student"("mentorId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
