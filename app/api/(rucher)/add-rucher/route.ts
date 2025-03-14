import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
  try {
    const { nom } = await req.json();

    if (!nom) throw new Error('Nom requis');

    const rucher = await prisma.rucher.create({
      data: {
        nom: nom,
      },
    });

    return NextResponse.json(rucher, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
