-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_cityId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "cityId" DROP NOT NULL,
ALTER COLUMN "cityId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
