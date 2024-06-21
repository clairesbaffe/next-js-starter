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

    const locations = await sql`SELECT * FROM Locations;`;

    const response = NextResponse.json({ locations }, { status: 200 });

    // Définir les en-têtes pour désactiver le cache
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 });

    // Définir les en-têtes pour désactiver le cache en cas d'erreur également
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  }
}
