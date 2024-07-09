import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tracker_id = searchParams.get('tracker_id');

  try {
    if (!tracker_id) throw new Error('Id du tracker requis');
    else {
      const locations = await prisma.historique_Tracker.findMany({
        where: {
          tracker_id: parseInt(tracker_id),
        },
        orderBy: {
          date_ajout: 'asc',
        },
      });

      return NextResponse.json(locations, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
