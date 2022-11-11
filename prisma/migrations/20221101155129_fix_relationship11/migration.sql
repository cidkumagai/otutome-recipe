/*
  Warnings:

  - You are about to drop the `_tag_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tag_recipe` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Information` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_tag_ingredient" DROP CONSTRAINT "_tag_ingredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_tag_ingredient" DROP CONSTRAINT "_tag_ingredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_tag_recipe" DROP CONSTRAINT "_tag_recipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_tag_recipe" DROP CONSTRAINT "_tag_recipe_B_fkey";

-- DropTable
DROP TABLE "_tag_ingredient";

-- DropTable
DROP TABLE "_tag_recipe";

-- CreateTable
CREATE TABLE "FoodAndRecipe" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "FoodAndRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodAndIngredient" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodAndIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodAndRecipe_id_key" ON "FoodAndRecipe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FoodAndIngredient_id_key" ON "FoodAndIngredient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_key" ON "Information"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_id_key" ON "Ingredient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_id_key" ON "Recipe"("id");

-- AddForeignKey
ALTER TABLE "FoodAndRecipe" ADD CONSTRAINT "FoodAndRecipe_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodAndRecipe" ADD CONSTRAINT "FoodAndRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodAndIngredient" ADD CONSTRAINT "FoodAndIngredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodAndIngredient" ADD CONSTRAINT "FoodAndIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
