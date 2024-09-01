-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blinkCreated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "dropOfAddress" TEXT NOT NULL,
    "ZipCode" TEXT NOT NULL,
    "orderstatus" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "buyerWallet" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerBlink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerWallet" TEXT NOT NULL,

    CONSTRAINT "SellerBlink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPurchaseTransaction" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "referenceKey" TEXT NOT NULL,
    "transasctionId" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerWallet" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderedWallet" TEXT NOT NULL,

    CONSTRAINT "ProductPurchaseTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userWallet" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_id_key" ON "Seller"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_walletAddress_key" ON "Seller"("walletAddress");

-- CreateIndex
CREATE INDEX "Seller_walletAddress_idx" ON "Seller"("walletAddress");

-- CreateIndex
CREATE INDEX "Seller_username_idx" ON "Seller"("username");

-- CreateIndex
CREATE INDEX "Product_sellerId_idx" ON "Product"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerBlink_sellerWallet_key" ON "SellerBlink"("sellerWallet");

-- CreateIndex
CREATE INDEX "user_wallet_address" ON "SellerBlink"("sellerWallet");

-- CreateIndex
CREATE INDEX "SellerBlink_id_idx" ON "SellerBlink"("id");

-- CreateIndex
CREATE INDEX "ProductPurchaseTransaction_referenceKey_idx" ON "ProductPurchaseTransaction"("referenceKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_userWallet_key" ON "User"("userWallet");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE INDEX "User_userWallet_idx" ON "User"("userWallet");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerWallet_fkey" FOREIGN KEY ("buyerWallet") REFERENCES "User"("userWallet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerBlink" ADD CONSTRAINT "SellerBlink_sellerWallet_fkey" FOREIGN KEY ("sellerWallet") REFERENCES "Seller"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPurchaseTransaction" ADD CONSTRAINT "ProductPurchaseTransaction_sellerWallet_fkey" FOREIGN KEY ("sellerWallet") REFERENCES "Seller"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPurchaseTransaction" ADD CONSTRAINT "ProductPurchaseTransaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPurchaseTransaction" ADD CONSTRAINT "ProductPurchaseTransaction_orderedWallet_fkey" FOREIGN KEY ("orderedWallet") REFERENCES "User"("userWallet") ON DELETE RESTRICT ON UPDATE CASCADE;
