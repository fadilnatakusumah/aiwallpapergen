/*
  Warnings:

  - You are about to drop the column `stripe_transaction_id` on the `Transaction` table. All the data in the column will be lost.
  - The `email_verified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `published` on the `Wallpaper` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallpaper_id]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallpaper_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider_transaction_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_transaction_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_stripe_transaction_id_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "stripe_transaction_id",
ADD COLUMN     "provider_transaction_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_verified",
ADD COLUMN     "email_verified" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Wallpaper" DROP COLUMN "published",
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_user_id_key" ON "Favorite"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_wallpaper_id_key" ON "Favorite"("wallpaper_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_key" ON "Like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_wallpaper_id_key" ON "Like"("wallpaper_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_provider_transaction_id_key" ON "Transaction"("provider_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
