/*
  Warnings:

  - You are about to drop the `Infomation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Infomation" DROP CONSTRAINT "Infomation_foodId_fkey";

-- DropTable
DROP TABLE "Infomation";

-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "pv" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Information_foodId_key" ON "Information"("foodId");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
