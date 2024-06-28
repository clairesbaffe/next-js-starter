import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const ruche_id = searchParams.get('ruche_id');

  try {
    if (!nom || !ruche_id) throw new Error('Nom et id de ruche requis');
    else {
      await prisma.tracker.create({
        data: {
          nom: nom,
          ruche_id: parseInt(ruche_id),
          mode: 'INACTIF',
        },
      });

      return NextResponse.json(
        `Tracker ${nom} créé pour la ruche ${ruche_id}`,
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
