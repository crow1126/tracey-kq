import { NextRequest, NextResponse } from 'next/server';
import { SEED_ARTICLES } from '@/data/db-seed';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { prisma } = require('@/lib/prisma');
  return prisma;
}

export async function GET() {
  const db = getPrisma();
  if (!db) {
    return NextResponse.json({ articles: SEED_ARTICLES, source: 'seed' });
  }
  try {
    const rows = await db.journalArticle.findMany({ orderBy: { date: 'desc' } });
    const articles = rows.map((r: Record<string, unknown>) => ({
      ...r,
      tags: r.tags ?? [],
    }));
    return NextResponse.json({ articles, source: 'neon' });
  } catch {
    return NextResponse.json({ articles: SEED_ARTICLES, source: 'seed' });
  }
}

export async function POST(req: NextRequest) {
  const db = getPrisma();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });
  try {
    const body = await req.json();
    const { id, tags, ...rest } = body;
    const article = await db.journalArticle.upsert({
      where: { id: id ?? '' },
      update: { ...rest, tags: tags ?? [] },
      create: { id, ...rest, tags: tags ?? [] },
    });
    return NextResponse.json({ article });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  const db = getPrisma();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    await db.journalArticle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
