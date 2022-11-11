/*
  Warnings:

  - You are about to drop the `_FoodToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodToIngredient" DROP CONSTRAINT "_FoodToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToIngredient" DROP CONSTRAINT "_FoodToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToRecipe" DROP CONSTRAINT "_FoodToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToRecipe" DROP CONSTRAINT "_FoodToRecipe_B_fkey";

-- DropTable
DROP TABLE "_FoodToIngredient";

-- DropTable
DROP TABLE "_FoodToRecipe";

-- CreateTable
CREATE TABLE "_tag_ingredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_tag_recipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tag_ingredient_AB_unique" ON "_tag_ingredient"("A", "B");

-- CreateIndex
CREATE INDEX "_tag_ingredient_B_index" ON "_tag_ingredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_tag_recipe_AB_unique" ON "_tag_recipe"("A", "B");

-- CreateIndex
CREATE INDEX "_tag_recipe_B_index" ON "_tag_recipe"("B");

-- AddForeignKey
ALTER TABLE "_tag_ingredient" ADD CONSTRAINT "_tag_ingredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tag_ingredient" ADD CONSTRAINT "_tag_ingredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tag_recipe" ADD CONSTRAINT "_tag_recipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tag_recipe" ADD CONSTRAINT "_tag_recipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
