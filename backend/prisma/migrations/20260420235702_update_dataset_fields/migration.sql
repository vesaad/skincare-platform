/*
  Warnings:

  - You are about to drop the column `priceRange` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceRange",
ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SkinProfile" ADD COLUMN     "diet" TEXT,
ADD COLUMN     "hormonalStatus" TEXT,
ADD COLUMN     "skinTone" TEXT;

-- AlterTable
ALTER TABLE "UserConcern" ADD COLUMN     "severity" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ProductInteraction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductInteraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductInteraction" ADD CONSTRAINT "ProductInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInteraction" ADD CONSTRAINT "ProductInteraction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
