/*
  Warnings:

  - A unique constraint covering the columns `[informationId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredientId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Information" DROP CONSTRAINT "Information_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_foodId_fkey";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "informationId" SERIAL NOT NULL,
ADD COLUMN     "ingredientId" SERIAL NOT NULL,
ADD COLUMN     "recipeId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Food_informationId_key" ON "Food"("informationId");

-- CreateIndex
CREATE UNIQUE INDEX "Food_ingredientId_key" ON "Food"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "Food_recipeId_key" ON "Food"("recipeId");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("informationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("ingredientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("recipeId") ON DELETE RESTRICT ON UPDATE CASCADE;
