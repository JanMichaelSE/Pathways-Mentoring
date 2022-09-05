/*
  Warnings:

  - You are about to drop the column `approved` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `finished` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Record` table. All the data in the column will be lost.
  - Added the required column `title` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "approved",
DROP COLUMN "finished",
DROP COLUMN "rating",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ALTER COLUMN "stage" SET DEFAULT E'New';
