/*
  Warnings:

  - A unique constraint covering the columns `[foodId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_foodId_key" ON "Recipe"("foodId");
