import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { startTrackerTimer } from '../../../../lib/timer';

function addSeconds(date: Date, seconds: number) {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export async function POST(req: Request, res: any) {
  try {
    const { trackerId, duration, deplacement } = await req.json();

    let date = new Date();
    const pause_end_time = addSeconds(date, parseInt(duration));

    const updatedTracker = await prisma.tracker.update({
      where: { id: trackerId },
      data: {
        mode: 'PAUSE',
        pause_duration: duration,
        pause_end_time: pause_end_time,
        deplacement: deplacement,
      },
    });

    // Start a timer for this tracker
    startTrackerTimer(trackerId, duration);

    return NextResponse.json(updatedTracker, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
