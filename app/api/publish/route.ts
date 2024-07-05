import { NextRequest, NextResponse } from 'next/server';
import { publishMessage } from '../../../mqttClient';

export async function POST(req: NextRequest) {
  try {
    const { topic, message } = await req.json();
    const messageString = JSON.stringify(message);

    publishMessage(topic, messageString);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
