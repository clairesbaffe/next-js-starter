import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
  try {
    const { id, nom } = await req.json();

    if (!nom || !id) throw new Error('Id du tracker et nom requis');

    await prisma.tracker.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom: nom,
      },
    });

    return NextResponse.json(`Le tracker s'appelle désormais ${nom}`, {
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
