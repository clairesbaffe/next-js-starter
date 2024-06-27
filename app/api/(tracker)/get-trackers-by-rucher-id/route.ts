import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rucher_id = searchParams.get('rucher_id');

  try {
    if (!rucher_id) throw new Error('Id du rucher requis');
    else {
      const trackers = await prisma.tracker.findMany({
        where: {
          rucher_id: parseInt(rucher_id),
        },
        orderBy: {
          id: 'asc',
        },
      });

      return NextResponse.json({ trackers }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
