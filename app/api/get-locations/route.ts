import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {
  try {
    const locations = await prisma.location.findMany();

    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    };

    return NextResponse.json({ locations }, { status: 200, headers });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
