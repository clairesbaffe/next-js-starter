import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(req: Request, res: any) {
  const { id, nom } = await req.json();

  try {
    if (!nom || !id) throw new Error('Id du rucher et nom requis');

    const rucher = await prisma.rucher.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom: nom,
      },
    });

    return NextResponse.json(rucher, {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
