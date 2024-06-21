import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');

  try {
    if (!longitude || !latitude)
      throw new Error('longitude and latitude required');
    else {
      const location = await prisma.location.create({
        data: {
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
        },
      });

      return NextResponse.json(
        `Created location {${parseFloat(longitude)}, ${parseFloat(latitude)}}`,
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
