-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_foodId_fkey";

-- CreateTable
CREATE TABLE "_FoodToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToIngredient_AB_unique" ON "_FoodToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToIngredient_B_index" ON "_FoodToIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToRecipe_AB_unique" ON "_FoodToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToRecipe_B_index" ON "_FoodToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_FoodToIngredient" ADD CONSTRAINT "_FoodToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToIngredient" ADD CONSTRAINT "_FoodToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToRecipe" ADD CONSTRAINT "_FoodToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToRecipe" ADD CONSTRAINT "_FoodToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
