import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reset = searchParams.get('reset');
  const rucher_id = searchParams.get('rucher_id');

  try {
    if (!reset || reset != 'true') {
      throw new Error('Confirmation de réinitialisation nécessaire');
    } else {
      if (!rucher_id) {
        throw new Error('Id de rucher requis');
      } else {
        await prisma.tracker.deleteMany({
          where: {
            rucher_id: parseInt(rucher_id),
          },
        });

        return NextResponse.json(
          `Les trackers du rucher ${rucher_id} ont été effacés`,
          {
            status: 200,
          },
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
