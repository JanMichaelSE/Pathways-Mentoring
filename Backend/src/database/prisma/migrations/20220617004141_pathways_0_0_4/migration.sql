/*
  Warnings:

  - Made the column `phone` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `academicDegree` on table `Mentor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyStatus` on table `Mentor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mentor" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "academicDegree" SET NOT NULL,
ALTER COLUMN "officeHours" SET DATA TYPE TEXT,
ALTER COLUMN "facultyStatus" SET NOT NULL,
ALTER COLUMN "interests" SET DATA TYPE TEXT;
