import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteRuches } from '../../../utils/deleteItems';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { reset, rucher_id } = await req.json();

    if (!reset || reset != 'true')
      throw new Error('Confirmation de réinitialisation nécessaire');
    if (!rucher_id) throw new Error('Id de rucher requis');

    const message = await deleteRuches(parseInt(rucher_id));

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
