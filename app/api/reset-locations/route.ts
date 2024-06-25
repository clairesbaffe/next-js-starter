import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reset = searchParams.get('reset');

  try {
    if (!reset || reset != 'true') {
      throw new Error('reset confirmation required');
    } else {
      await prisma.historique_Tracker.deleteMany({});

      return NextResponse.json('Deleted all locations', { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
