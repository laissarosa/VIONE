/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `imageUrl`;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
