import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteRuches } from '../../../utils/deleteItems';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { reset, id } = await req.json();

    if (!reset || reset != 'true')
      throw new Error('Confirmation de réinitialisation nécessaire');
    if (!id) throw new Error('Id de rucher requis');

    await deleteRuches(id);

    const rucher = await prisma.rucher.delete({
      where: {
        id: id,
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
