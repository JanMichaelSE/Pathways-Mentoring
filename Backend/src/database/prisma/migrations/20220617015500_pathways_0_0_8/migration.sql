/*
  Warnings:

  - Changed the type of `gender` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `academicDegree` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `facultyStatus` on the `Mentor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "gender",
ADD COLUMN     "gender" VARCHAR(10) NOT NULL,
DROP COLUMN "academicDegree",
ADD COLUMN     "academicDegree" VARCHAR(50) NOT NULL,
DROP COLUMN "facultyStatus",
ADD COLUMN     "facultyStatus" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gender",
ADD COLUMN     "gender" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR(10) NOT NULL;

-- DropEnum
DROP TYPE "AcademicDegree";

-- DropEnum
DROP TYPE "FacultyStatus";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Role";
