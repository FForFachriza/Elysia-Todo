/*
  Warnings:

  - A unique constraint covering the columns `[categories]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categories_categories_key` ON `categories`(`categories`);
