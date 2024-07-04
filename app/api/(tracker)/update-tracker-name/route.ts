import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const id = searchParams.get('id');

  try {
    if (!nom || !id) throw new Error('Id du tracker et nom requis');
    else {
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
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
