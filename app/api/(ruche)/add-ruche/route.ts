import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
  try {
    const { nom, rucher_id } = await req.json();

    if (!nom || !rucher_id) throw new Error('Nom et id de rucher requis');

    const ruche = await prisma.ruche.create({
      data: {
        nom: nom,
        rucher_id: parseInt(rucher_id),
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
