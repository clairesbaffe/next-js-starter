import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
  try {
    const { nom, ruche_id } = await req.json();
    if (!nom || !ruche_id) throw new Error('Nom et id de ruche requis');

    const tracker = await prisma.tracker.create({
      data: {
        nom: nom,
        ruche_id: parseInt(ruche_id),
        mode: 'INACTIF',
        date_modif_mode: new Date(),
      },
      include: {
        ruche: true,
      },
    });

    return NextResponse.json(tracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
