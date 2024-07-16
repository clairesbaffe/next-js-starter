import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { startTrackerTimer } from '../../../../lib/timer';
import { publishMessage } from '../../../../mqttClient';

const prisma = new PrismaClient();

function addSeconds(date: Date, seconds: number) {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export async function PATCH(req: Request, res: any) {
  try {
    const { trackerId, duration } = await req.json();

    let date = new Date();
    const pause_end_time = addSeconds(date, parseInt(duration));

    const updatedTracker = await prisma.tracker.update({
      where: { id: trackerId, mode: 'TRACKING' },
      data: {
        pause_duration: duration,
        pause_end_time: pause_end_time,
        pause_tracking: true,
      },
    });

    // Start a timer for this tracker
    startTrackerTimer(trackerId, duration, 'TRACKING');

    const topic = `t/t/${updatedTracker.id}`;
    const messageString = `{"ind": 1, "time": ${duration}}`;
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
