import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { publishMessage } from '../../../../mqttClient';

const prisma = new PrismaClient();

export async function PATCH(req: Request, res: any) {
  try {
    const { trackerId, start_pause } = await req.json();

    let updatedTracker;
    let messageString;

    if (start_pause) {
      console.log('STARTING PAUSE');
      updatedTracker = await prisma.tracker.update({
        where: { id: trackerId, mode: 'TRACKING' },
        data: {
          pause_tracking: true,
        },
      });
      messageString = `{"ind": 1}`;
    } else {
      updatedTracker = await prisma.tracker.update({
        where: { id: trackerId, mode: 'TRACKING', pause_tracking: true },
        data: {
          pause_tracking: false,
        },
      });
      messageString = `{"ind": 2}`;
    }

    const topic = `t/t/${trackerId}`;
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
