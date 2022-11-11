/*
  Warnings:

  - A unique constraint covering the columns `[foodId]` on the table `Infomation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Infomation_foodId_key" ON "Infomation"("foodId");
