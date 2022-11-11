-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_foodId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("recipeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("ingredientId") ON DELETE RESTRICT ON UPDATE CASCADE;
