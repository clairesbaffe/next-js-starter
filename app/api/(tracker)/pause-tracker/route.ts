import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { startTrackerTimer } from '../../../../lib/timer';

export async function PATCH(req: Request, res: any) {
  try {
    const { trackerId, duration, deplacement, pause_end_time } =
      await req.json();

    const updatedTracker = await prisma.tracker.update({
      where: { id: trackerId },
      data: {
        mode: 'PAUSE',
        pause_duration: duration,
        pause_end_time: pause_end_time,
        deplacement: deplacement,
        date_modif_mode: new Date(),
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
