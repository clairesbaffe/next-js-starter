import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const validModes = ['INACTIF', 'FONCTIONNEL', 'PAUSE', 'TRACKING'] as const;
type Mode = (typeof validModes)[number];

function isValidMode(mode: string): mode is Mode {
  return validModes.includes(mode as Mode);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');

  try {
    if (!id) throw new Error('Id du tracker requis');
    else {
      if (!mode) {
        throw new Error('Mode requis requis');
      } else {
        if (mode && !isValidMode(mode)) {
          throw new Error("Le mode n'est pas valide");
        } else if (mode && isValidMode(mode)) {
          // MODIFIER LE MODE
          await prisma.tracker.update({
            where: {
              id: parseInt(id),
            },
            data: {
              mode: mode,
            },
          });
          return NextResponse.json(`Le tracker ${id} est en mode ${mode}`, {
            status: 200,
          });
        }
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
