import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function startTrackerTimer(trackerId: number, duration: number) {
  setTimeout(async () => {
    await prisma.tracker.update({
      where: { id: trackerId },
      data: {
        mode: 'FONCTIONNEL',
        pause_duration: null,
        pause_end_time: null,
        deplacement: null,
        pause_tracking: null,
        date_modif_mode: new Date(),
      },
    });
  }, duration * 1000);

  await prisma.$disconnect();
}
