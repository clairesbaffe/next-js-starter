// pages/api/get-locations.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const locations = await prisma.location.findMany();

    // Ajout des headers pour éviter la mise en cache
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
