// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { name, owner } = await req.json();

//   try {
//     if (!name || !owner) throw new Error('Pet and owner names required');
//     await sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const pets = await sql`SELECT * FROM Pets;`;
//   return NextResponse.json({ pets }, { status: 200 });
// }
