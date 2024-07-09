import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (!id) throw new Error('Id du tracker requis');
    else {
      const tracker = await prisma.tracker.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      return NextResponse.json(tracker, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
