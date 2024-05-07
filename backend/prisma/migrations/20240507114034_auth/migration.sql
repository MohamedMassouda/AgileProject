-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_writerId_fkey";

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "OfficeMember"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
