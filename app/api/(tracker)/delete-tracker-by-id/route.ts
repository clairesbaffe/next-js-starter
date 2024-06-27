import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      throw new Error('Id de tracker requis');
    } else {
      await prisma.tracker.delete({
        where: {
          id: parseInt(id),
        },
      });

      return NextResponse.json(`Le tracker ${id} a été effacé`, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
