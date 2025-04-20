/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to drop the column `mobile` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ibfk_2`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_category_id_fkey`;

-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('pending', 'completed', 'cancelled', 'shipped', 'approved') NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    MODIFY `product_id` VARCHAR(255) NOT NULL,
    MODIFY `category_id` CHAR(36) NULL,
    ADD PRIMARY KEY (`product_id`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `mobile`;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `orders` RENAME INDEX `user_id` TO `user_id_idx`;

-- RenameIndex
ALTER TABLE `products` RENAME INDEX `products_category_id_idx` TO `category_id_idx`;
