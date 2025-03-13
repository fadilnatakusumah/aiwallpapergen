/*
  Warnings:

  - The primary key for the `Suggestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `suggestion_id` on the `Suggestion` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transaction_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `Wallpaper` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_sent` on the `Wallpaper` table. All the data in the column will be lost.
  - You are about to drop the column `refined_prompt` on the `Wallpaper` table. All the data in the column will be lost.
  - The required column `id` was added to the `Suggestion` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `chat_id` to the `Wallpaper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt_id` to the `Wallpaper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Wallpaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_pkey",
DROP COLUMN "suggestion_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "transaction_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Wallpaper" DROP COLUMN "prompt",
DROP COLUMN "prompt_sent",
DROP COLUMN "refined_prompt",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "prompt_id" TEXT NOT NULL,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "prompt_sent" TEXT NOT NULL,
    "refined_prompt" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallpaper" ADD CONSTRAINT "Wallpaper_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallpaper" ADD CONSTRAINT "Wallpaper_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
