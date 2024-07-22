import { PrismaClient } from '@prisma/client';
import { startTrackerTimer } from './timer';

const prisma = new PrismaClient();

let initialized = false;

export async function initializePausedTrackers() {
  if (initialized) return;
  initialized = true;

  await fetch('https://next-js-starter-lyart.vercel.app/api/restore-timers');
}
