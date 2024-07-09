import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { id } = await req.json();

    if (!id) throw new Error('Id de tracker requis');

    const tracker = await prisma.tracker.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(tracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
