import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const validModes = ['INACTIF', 'FONCTIONNEL', 'PAUSE', 'TRACKING'] as const;
type Mode = (typeof validModes)[number];

function isValidMode(mode: string): mode is Mode {
  return validModes.includes(mode as Mode);
}

export async function PATCH(req: Request, res: any) {
  try {
    const { id, mode } = await req.json();

    if (!id) throw new Error('Id du tracker requis');
    if (!mode) throw new Error('Mode requis');
    if (mode && !isValidMode(mode)) throw new Error("Le mode n'est pas valide");

    if (mode && isValidMode(mode)) {
      // MODIFIER LE MODE
      if (mode === 'PAUSE')
        throw new Error('Utiliser la route pause-tracker poru le mode PAUSE');

      const tracker = await prisma.tracker.update({
        where: {
          id: parseInt(id),
        },
        data: {
          mode: mode,
          pause_duration: null,
          pause_end_time: null,
          deplacement: null,
          pause_tracking: null,
          date_modif_mode: new Date(),
        },
      });
      return NextResponse.json(tracker, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
