/*
  Warnings:

  - The values [Master,Doctoral] on the enum `AcademicDegree` will be removed. If these variants are still used in the database, this will fail.
  - The values [Instructor,Assistant,Associate,Professor] on the enum `FacultyStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Male,Female,Other] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [Student,Mentor,Admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcademicDegree_new" AS ENUM ('master', 'doctoral');
ALTER TABLE "Mentor" ALTER COLUMN "academicDegree" TYPE "AcademicDegree_new" USING ("academicDegree"::text::"AcademicDegree_new");
ALTER TYPE "AcademicDegree" RENAME TO "AcademicDegree_old";
ALTER TYPE "AcademicDegree_new" RENAME TO "AcademicDegree";
DROP TYPE "AcademicDegree_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "FacultyStatus_new" AS ENUM ('instructor', 'assistant', 'associate', 'professor');
ALTER TABLE "Mentor" ALTER COLUMN "facultyStatus" TYPE "FacultyStatus_new" USING ("facultyStatus"::text::"FacultyStatus_new");
ALTER TYPE "FacultyStatus" RENAME TO "FacultyStatus_old";
ALTER TYPE "FacultyStatus_new" RENAME TO "FacultyStatus";
DROP TYPE "FacultyStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('male', 'female', 'other');
ALTER TABLE "Mentor" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TABLE "Student" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('student', 'mentor', 'admin');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;
