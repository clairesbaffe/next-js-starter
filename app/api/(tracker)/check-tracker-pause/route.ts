import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('trackerId');

  try {
    if (!id) throw new Error('Id du tracker requis');
    const tracker = await prisma.tracker.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!tracker) throw new Error('Tracker introuvable');

    let response = '';
    if (tracker.mode === 'PAUSE') {
      if (tracker.deplacement) response = '2';
      else response = '1';
    } else response = '0';

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
