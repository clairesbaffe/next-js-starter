import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const rucher_id = searchParams.get('rucher_id');

  try {
    if (!nom || !rucher_id) throw new Error('Id du rucher et nom requis');
    else {
      await prisma.rucher.update({
        where: {
          id: parseInt(rucher_id),
        },
        data: {
          nom: nom,
        },
      });

      return NextResponse.json(`LE rucher s'appelle désormais ${nom}`, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
