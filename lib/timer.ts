import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function startTrackerTimer(trackerId: number, duration: number) {
  setTimeout(async () => {
    await prisma.tracker.update({
      where: { id: trackerId },
      data: {
        mode: 'FONCTIONNEL',
        pause_duration: null,
        pause_end_time: null,
        deplacement: null,
      },
    });
  }, duration * 1000); // convertir la durée en millisecondes
}
