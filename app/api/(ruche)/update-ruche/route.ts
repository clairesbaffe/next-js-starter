import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const ruche_id = searchParams.get('ruche_id');

  try {
    if (!nom || !ruche_id) throw new Error('Id de la ruche et nom requis');
    else {
      await prisma.ruche.update({
        where: {
          id: parseInt(ruche_id),
        },
        data: {
          nom: nom,
        },
      });

      return NextResponse.json(`La ruche s'appelle désormais ${nom}`, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
