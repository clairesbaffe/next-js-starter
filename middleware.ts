import { NextResponse } from 'next/server';
import { initializePausedTrackers } from './lib/initTimers';

export async function middleware(request: Request) {
  // Initialiser les minuteries à chaque requête
  await initializePausedTrackers();

  return NextResponse.next();
}
