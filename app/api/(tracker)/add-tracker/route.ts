import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const rucher_id = searchParams.get('rucher_id');

  try {
    if (!nom || !rucher_id) throw new Error('Nom et id de rucher requis');
    else {
      await prisma.tracker.create({
        data: {
          nom: nom,
          rucher_id: parseInt(rucher_id),
          mode: 'INACTIF',
        },
      });

      return NextResponse.json(`Tracker ${nom} créé`, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
