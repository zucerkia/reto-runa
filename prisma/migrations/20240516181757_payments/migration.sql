-- CreateTable
CREATE TABLE `Payments` (
    `id` VARCHAR(191) NOT NULL,
    `involvesWatchonly` BOOLEAN NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `confirmations` INTEGER NOT NULL,
    `blockhash` VARCHAR(191) NOT NULL,
    `blockindex` INTEGER NOT NULL,
    `blocktime` DATETIME(3) NOT NULL,
    `txid` VARCHAR(191) NOT NULL,
    `vout` INTEGER NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `timereceived` DATETIME(3) NOT NULL,
    `bip125Replaceable` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
