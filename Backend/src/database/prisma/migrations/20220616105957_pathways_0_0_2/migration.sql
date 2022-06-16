/*
  Warnings:

  - Made the column `gender` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fieldOfStudy` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mentor" ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "profilePicture" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "graduationDate" DROP NOT NULL,
ALTER COLUMN "gpa" DROP NOT NULL,
ALTER COLUMN "institution" SET NOT NULL,
ALTER COLUMN "institution" SET DATA TYPE TEXT,
ALTER COLUMN "fieldOfStudy" SET NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "profilePicture" SET DATA TYPE TEXT;
