import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const trackers = await prisma.tracker.findMany({
      where: {
        mode: 'PAUSE',
      },
    });

    console.log('Trackers in PAUSE mode:', trackers);

    trackers.map(async (tracker) => {
      if (tracker.pause_end_time) {
        const remainingTime =
          new Date(tracker.pause_end_time).getTime() - Date.now();

        console.log(
          `Tracker ID: ${tracker.id}, Remaining Time: ${remainingTime}`,
        );

        if (remainingTime > 0) {
          setTimeout(async () => {
            await prisma.tracker.update({
              where: { id: tracker.id },
              data: {
                mode: 'FONCTIONNEL',
                pause_duration: null,
                pause_end_time: null,
                deplacement: null,
                date_modif_mode: new Date(),
              },
            });
            console.log(`Tracker ID: ${tracker.id} updated to FONCTIONNEL`);
          }, remainingTime);
        } else {
          await prisma.tracker.update({
            where: { id: tracker.id },
            data: {
              mode: 'FONCTIONNEL',
              pause_duration: null,
              pause_end_time: null,
              deplacement: null,
            },
          });
          console.log(
            `Tracker ID: ${tracker.id} remaining time is less than 0`,
          );
        }
      } else console.log(`Tracker ID: ${tracker.id} has no pause_end_time`);
    });

    return NextResponse.json({ message: 'Timers restored' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
