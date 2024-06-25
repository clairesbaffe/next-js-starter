-- CreateEnum
CREATE TYPE "TrackerMode" AS ENUM ('INACTIF', 'FONCTIONNEL', 'PAUSE', 'TRACKING');

-- CreateTable
CREATE TABLE "Rucher" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruche" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "rucher_id" INTEGER NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ruche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracker" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "rucher_id" INTEGER NOT NULL,
    "mode" "TrackerMode" NOT NULL,
    "date_ajout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historique_Tracker" (
    "id" SERIAL NOT NULL,
    "tracker_id" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "date_ajout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historique_Tracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ruche" ADD CONSTRAINT "Ruche_rucher_id_fkey" FOREIGN KEY ("rucher_id") REFERENCES "Rucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracker" ADD CONSTRAINT "Tracker_rucher_id_fkey" FOREIGN KEY ("rucher_id") REFERENCES "Rucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historique_Tracker" ADD CONSTRAINT "Historique_Tracker_tracker_id_fkey" FOREIGN KEY ("tracker_id") REFERENCES "Tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
