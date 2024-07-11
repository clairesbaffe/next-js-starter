import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const trackers = await prisma.tracker.findMany({
      where: {
        mode: 'PAUSE',
        pause_end_time: {
          gte: new Date(),
        },
      },
    });

    trackers.forEach((tracker) => {
      if (tracker.pause_end_time) {
        const remainingTime =
          new Date(tracker.pause_end_time).getTime() - Date.now();

        if (remainingTime > 0) {
          setTimeout(async () => {
            await prisma.tracker.update({
              where: { id: tracker.id },
              data: {
                mode: 'FONCTIONNEL',
                pause_duration: null,
                pause_end_time: null,
                deplacement: null,
              },
            });
          }, remainingTime);
        }
      }
    });

    return NextResponse.json({ message: 'Timers restored' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
