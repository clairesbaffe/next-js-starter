import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
  try {
    const { nom, ruche_id } = await req.json();

    if (!nom || !ruche_id) throw new Error('Id de la ruche et nom requis');

    const ruche = await prisma.ruche.update({
      where: {
        id: parseInt(ruche_id),
      },
      data: {
        nom: nom,
      },
    });

    return NextResponse.json(ruche, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
