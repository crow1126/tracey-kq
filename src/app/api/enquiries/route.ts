import { NextRequest, NextResponse } from 'next/server';

function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { prisma } = require('@/lib/prisma');
  return prisma;
}

export async function GET() {
  const db = getPrisma();
  if (!db) {
    return NextResponse.json({ enquiries: [], source: 'seed' });
  }
  try {
    const enquiries = await db.bespokeEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ enquiries, source: 'neon' });
  } catch {
    return NextResponse.json({ enquiries: [], source: 'seed' });
  }
}

export async function POST(req: NextRequest) {
  const db = getPrisma();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });
  try {
    const body = await req.json();
    const enquiry = await db.bespokeEnquiry.create({ data: body });
    return NextResponse.json({ enquiry });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const db = getPrisma();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const enquiry = await db.bespokeEnquiry.update({ where: { id }, data: { status } });
    return NextResponse.json({ enquiry });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
