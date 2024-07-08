import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const now = new Date();

  try {
    // Trouver tous les trackers en mode PAUSE dont la pause est terminée
    const pausedTrackers = await prisma.tracker.findMany({
      where: {
        mode: 'PAUSE',
        pause_end_time: {
          lte: now,
        },
      },
    });

    if (pausedTrackers.length > 0) {
      let getTrackerIds = (pausedTrackers: any) => {
        let ids = pausedTrackers.map((tracker: any) => tracker.id);
        return ids;
      };
      const trackerIds: any = getTrackerIds(pausedTrackers);

      // Mettre à jour ces trackers en mode FONCTIONNEL
      for (const tracker of pausedTrackers) {
        await prisma.tracker.update({
          where: { id: tracker.id },
          data: {
            mode: 'FONCTIONNEL',
            pause_duration: null,
            pause_end_time: null,
            deplacement: null,
          },
        });
      }

      return NextResponse.json(
        `Les trackers [${trackerIds.join()}] ont terminé leur pause`,
        {
          status: 200,
        },
      );
    } else {
      return NextResponse.json(`Aucun tracker ne doit terminer sa pause`, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
