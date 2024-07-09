import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: any) {
  try {
    const { reset, ruche_id } = await req.json();

    if (!reset) throw new Error('Confirmation de réinitialisation nécessaire');
    if (!ruche_id) throw new Error('Id de ruche requis');

    const trackers = await prisma.tracker.findMany({
      where: {
        ruche_id: parseInt(ruche_id),
      },
    });

    trackers.forEach(async (tracker) => {
      await prisma.historique_Tracker.deleteMany({
        where: {
          tracker_id: tracker.id,
        },
      });
    });

    await prisma.tracker.deleteMany({
      where: {
        ruche_id: parseInt(ruche_id),
      },
    });

    return NextResponse.json(
      `Les trackers de la ruche ${ruche_id} ont été effacés`,
      {
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
