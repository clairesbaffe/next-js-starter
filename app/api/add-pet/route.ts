// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const [name, owner] = req.body;

//   try {
//     if (!name || !owner) throw new Error('Pet and owner names required');
//     await sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const pets = await sql`SELECT * FROM Pets;`;
//   return NextResponse.json({ pets }, { status: 200 });
// }

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, owner } = await req.json();

  try {
    if (!name || !owner) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}
