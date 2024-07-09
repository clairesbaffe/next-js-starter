import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteTrackers } from '../../../utils/deleteItems';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { reset, ruche_id } = await req.json();

    if (!reset) throw new Error('Confirmation de réinitialisation nécessaire');
    if (!ruche_id) throw new Error('Id de ruche requis');

    const message = await deleteTrackers(parseInt(ruche_id));

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
