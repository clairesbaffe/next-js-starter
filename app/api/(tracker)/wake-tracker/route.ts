import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { publishMessage } from '../../../../mqttClient';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('trackerId');
    const source = searchParams.get('source');

    if (!id) throw new Error('Id du tracker requis');
    if (!source) throw new Error('Source de la requête requise');

    const updatedTracker = await prisma.tracker.update({
      where: {
        id: parseInt(id),
        mode: 'INACTIF',
      },
      data: {
        mode: 'FONCTIONNEL',
        date_modif_mode: new Date(),
      },
    });

    if (source === 'site') {
      const topic = `t/i/${updatedTracker.id}`;
      const messageString = `{"ind": 1}`;
      publishMessage(topic, messageString);
    }

    return NextResponse.json(updatedTracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
