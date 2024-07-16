import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('trackerId');

    if (!id) throw new Error('Id du tracker requis');

    await prisma.tracker.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
    });

    const updatedTracker = await prisma.tracker.update({
      where: { id: parseInt(id) },
      data: {
        mode: 'INACTIF',
        date_modif_mode: new Date(),
      },
    });

    return NextResponse.json(updatedTracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
