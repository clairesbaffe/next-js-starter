import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reset = searchParams.get('reset');
  const ruche_id = searchParams.get('ruche_id');

  try {
    if (!reset || reset != 'true') {
      throw new Error('Confirmation de réinitialisation nécessaire');
    } else {
      if (!ruche_id) {
        throw new Error('Id de ruche requis');
      } else {
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
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
