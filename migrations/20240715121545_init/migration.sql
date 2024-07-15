/*
  Warnings:

  - Made the column `date_modif_mode` on table `Tracker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tracker" ALTER COLUMN "date_modif_mode" SET NOT NULL;
