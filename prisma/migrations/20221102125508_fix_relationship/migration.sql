/*
  Warnings:

  - You are about to drop the `FoodAndIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodAndRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodAndIngredient" DROP CONSTRAINT "FoodAndIngredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodAndIngredient" DROP CONSTRAINT "FoodAndIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "FoodAndRecipe" DROP CONSTRAINT "FoodAndRecipe_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodAndRecipe" DROP CONSTRAINT "FoodAndRecipe_recipeId_fkey";

-- DropTable
DROP TABLE "FoodAndIngredient";

-- DropTable
DROP TABLE "FoodAndRecipe";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
