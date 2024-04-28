/*
  Warnings:

  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileId",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
