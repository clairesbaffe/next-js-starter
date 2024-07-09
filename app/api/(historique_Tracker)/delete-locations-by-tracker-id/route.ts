import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteLocations } from '../../../utils/deleteItems';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { id } = await req.json();

    if (!id) throw new Error('Id de tracker requis');

    const message = await deleteLocations(id);

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
