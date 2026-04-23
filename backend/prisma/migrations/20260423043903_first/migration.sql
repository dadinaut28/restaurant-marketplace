/*
  Warnings:

  - Added the required column `imageUrl` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "imageUrl" TEXT NOT NULL;
