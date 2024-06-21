import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { rows, fields } = await sql`SELECT * FROM locations`;

    const response = NextResponse.json({ rows }, { status: 200 });

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
