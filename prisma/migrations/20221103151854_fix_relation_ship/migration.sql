/*
  Warnings:

  - A unique constraint covering the columns `[recipeId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredientId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ingredientId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_foodId_fkey";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Food_recipeId_key" ON "Food"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Food_ingredientId_key" ON "Food"("ingredientId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("recipeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("ingredientId") ON DELETE RESTRICT ON UPDATE CASCADE;
