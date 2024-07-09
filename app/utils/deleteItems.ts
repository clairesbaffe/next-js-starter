import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteLocations(tracker_id: number) {
  try {
    const message = await prisma.historique_Tracker.deleteMany({
      where: {
        tracker_id: tracker_id,
      },
    });

    return message;
  } catch (error) {
    throw new Error('Failed to delete locations');
  }
}

export async function deleteTrackers(ruche_id: number) {
  try {
    const trackers = await prisma.tracker.findMany({
      where: {
        ruche_id: ruche_id,
      },
    });

    await Promise.all(
      trackers.map(async (tracker) => {
        await deleteLocations(tracker.id);
      }),
    );

    const message = await prisma.tracker.deleteMany({
      where: {
        ruche_id: ruche_id,
      },
    });

    return message;
  } catch (error) {
    throw new Error('Failed to delete trackers and their dependencies');
  }
}

export async function deleteRuches(rucher_id: number) {
  try {
    const ruches = await prisma.ruche.findMany({
      where: {
        rucher_id: rucher_id,
      },
    });

    await Promise.all(
      ruches.map(async (ruche) => {
        await deleteTrackers(ruche.id);
      }),
    );

    const message = await prisma.ruche.deleteMany({
      where: {
        rucher_id: rucher_id,
      },
    });

    return message;
  } catch (error) {
    throw new Error('Failed to delete ruches and their dependencies');
  }
}
