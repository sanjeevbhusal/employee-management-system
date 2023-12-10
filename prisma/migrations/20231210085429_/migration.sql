/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dob` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `about` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetAddress` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organizationId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "emailVerified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "dob" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "streetAddress" SET NOT NULL,
ALTER COLUMN "organizationId" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "Account";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
