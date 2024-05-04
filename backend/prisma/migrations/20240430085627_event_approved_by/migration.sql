-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_officeMemberId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "officeMemberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_officeMemberId_fkey" FOREIGN KEY ("officeMemberId") REFERENCES "OfficeMember"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
