import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const validModes = ['INACTIF', 'FONCTIONNEL', 'PAUSE', 'TRACKING'] as const;
type Mode = (typeof validModes)[number];

function isValidMode(mode: string): mode is Mode {
  return validModes.includes(mode as Mode);
}

export async function startTrackerTimer(
  trackerId: number,
  duration: number,
  mode: string,
) {
  if (mode && !isValidMode(mode)) throw new Error("Le mode n'est pas valide");

  if (mode && isValidMode(mode)) {
    setTimeout(async () => {
      const data: any = {
        mode: mode,
        pause_duration: null,
        pause_end_time: null,
        deplacement: null,
        pause_tracking: null,
      };

      if (mode === 'FONCTIONNEL') {
        data.date_modif_mode = new Date();
      }

      await prisma.tracker.update({
        where: { id: trackerId },
        data: data,
      });
    }, duration * 1000);
  }

  await prisma.$disconnect();
}
