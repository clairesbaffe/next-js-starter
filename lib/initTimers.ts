import { PrismaClient } from '@prisma/client';
import { startTrackerTimer } from './timer';

const prisma = new PrismaClient();

let initialized = false;

export async function initializePausedTrackers() {
  if (initialized) return;
  initialized = true;

  await fetch('http://localhost:3000/api/restore-timers');
}
