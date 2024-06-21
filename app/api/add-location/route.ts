import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');

  try {
    if (!longitude || !latitude)
      throw new Error('longitude and latitude required');
    await sql`INSERT INTO Locations (longitude, latitude) VALUES (${longitude}, ${latitude});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const locations = await sql`SELECT * FROM Locations;`;
  return NextResponse.json({ locations }, { status: 200 });
}
