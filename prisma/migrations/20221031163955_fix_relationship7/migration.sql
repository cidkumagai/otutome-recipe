/*
  Warnings:

  - You are about to drop the column `informationId` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Information" DROP CONSTRAINT "Information_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_foodId_fkey";

-- DropIndex
DROP INDEX "Food_informationId_key";

-- DropIndex
DROP INDEX "Food_ingredientId_key";

-- DropIndex
DROP INDEX "Food_recipeId_key";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "informationId",
DROP COLUMN "ingredientId",
DROP COLUMN "recipeId";

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
