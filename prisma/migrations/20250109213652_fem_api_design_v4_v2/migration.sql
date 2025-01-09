/*
  Warnings:

  - You are about to drop the column `body` on the `Update` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Update" DROP COLUMN "body",
ADD COLUMN     "desc" TEXT NOT NULL;
