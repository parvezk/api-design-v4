/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productId_fkey";

-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "productName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_name_key" ON "Product"("id", "name");

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_productId_productName_fkey" FOREIGN KEY ("productId", "productName") REFERENCES "Product"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
