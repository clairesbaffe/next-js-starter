import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');

  try {
    if (!nom) throw new Error('Nom requis');
    else {
      await prisma.rucher.create({
        data: {
          nom: nom,
        },
      });

      return NextResponse.json(`Rucher ${nom} créé`, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
