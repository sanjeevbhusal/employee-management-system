-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "departmentId" DROP NOT NULL,
ALTER COLUMN "roleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
