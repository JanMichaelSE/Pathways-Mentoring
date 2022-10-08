/*
  Warnings:

  - A unique constraint covering the columns `[recordId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_recordId_key" ON "Note"("recordId");
