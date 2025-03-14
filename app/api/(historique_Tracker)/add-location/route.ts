import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackerId = searchParams.get('trackerId');
  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');

  try {
    if (!trackerId || !longitude || !latitude)
      throw new Error('Id de tracker, latitude et longitude requis');

    const location = await prisma.historique_Tracker.create({
      data: {
        tracker_id: parseInt(trackerId),
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      },
    });

    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Serveur Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
