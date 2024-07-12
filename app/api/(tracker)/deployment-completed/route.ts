import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await fetch('https://next-js-starter-lyart.vercel.app/api/restore-timers');
    return NextResponse.json(
      { message: 'Post-deployment action executed.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error executing post-deployment action:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
