import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { publishMessage } from '../../../../mqttClient';

const prisma = new PrismaClient();

export async function PATCH(req: Request, res: any) {
  try {
    const { trackerId } = await req.json();

    const updatedTracker = await prisma.tracker.update({
      where: { id: trackerId, mode: 'TRACKING' },
      data: {
        mode: 'FONCTIONNEL',
        pause_duration: null,
        pause_end_time: null,
        deplacement: null,
        pause_tracking: null,
        date_modif_mode: new Date(),
      },
    });

    const topic = `t/t/${updatedTracker.id}`;
    const messageString = `{"ind": 2}`;
    publishMessage(topic, messageString);

    return NextResponse.json(updatedTracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
