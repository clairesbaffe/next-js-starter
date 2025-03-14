import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rucher_id = searchParams.get('rucher_id');

  try {
    if (!rucher_id) throw new Error('Id du rucher requis');

    const rucherIds = rucher_id.split(',').map((id) => parseInt(id));
    const ruches = await prisma.ruche.findMany({
      where: {
        rucher_id: {
          in: rucherIds,
        },
      },
    });

    return NextResponse.json(ruches, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
