import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const validModes = ['INACTIF', 'FONCTIONNEL', 'PAUSE', 'TRACKING'] as const;
type Mode = (typeof validModes)[number];

function isValidMode(mode: string): mode is Mode {
  return validModes.includes(mode as Mode);
}

function addSeconds(date: Date, seconds: number) {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  const pause_duration = searchParams.get('pause_duration');

  try {
    if (!id) throw new Error('Id du tracker requis');
    if (!mode) throw new Error('Mode requis');
    if (mode && !isValidMode(mode)) throw new Error("Le mode n'est pas valide");

    if (mode && isValidMode(mode)) {
      // MODIFIER LE MODE
      if (mode === 'PAUSE') {
        if (!pause_duration) throw new Error('Durée de la pause requise');

        let date = new Date();

        const pause_end_time = addSeconds(date, parseInt(pause_duration));

        await prisma.tracker.update({
          where: {
            id: parseInt(id),
          },
          data: {
            mode: mode,
            pause_duration: parseInt(pause_duration),
            pause_end_time: pause_end_time,
          },
        });
        return NextResponse.json(
          `Le tracker ${id} est en mode ${mode} pendant ${pause_duration} secondes`,
          {
            status: 200,
          },
        );
      } else {
        await prisma.tracker.update({
          where: {
            id: parseInt(id),
          },
          data: {
            mode: mode,
            pause_duration: null,
            pause_end_time: null,
          },
        });
        return NextResponse.json(`Le tracker ${id} est en mode ${mode}`, {
          status: 200,
        });
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
