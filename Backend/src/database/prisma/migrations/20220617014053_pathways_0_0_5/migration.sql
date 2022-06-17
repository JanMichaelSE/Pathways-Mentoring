/*
  Warnings:

  - Changed the type of `gender` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `academicDegree` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `facultyStatus` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Mentor', 'Admin');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "FacultyStatus" AS ENUM ('Instructor', 'Assistant', 'Associate', 'Professor');

-- CreateEnum
CREATE TYPE "AcademicDegree" AS ENUM ('Master', 'Doctoral');

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "academicDegree",
ADD COLUMN     "academicDegree" "AcademicDegree" NOT NULL,
DROP COLUMN "facultyStatus",
ADD COLUMN     "facultyStatus" "FacultyStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
