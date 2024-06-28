/*
  Warnings:

  - You are about to drop the column `rucher_id` on the `Tracker` table. All the data in the column will be lost.
  - Added the required column `ruche_id` to the `Tracker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tracker" DROP CONSTRAINT "Tracker_rucher_id_fkey";

-- AlterTable
ALTER TABLE "Tracker" DROP COLUMN "rucher_id",
ADD COLUMN     "ruche_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tracker" ADD CONSTRAINT "Tracker_ruche_id_fkey" FOREIGN KEY ("ruche_id") REFERENCES "Ruche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
