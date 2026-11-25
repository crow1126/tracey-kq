import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SEED_PRODUCTS } from '@/data/db-seed';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ products: SEED_PRODUCTS, source: 'seed' });
    }
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ products, source: 'neon' });
  } catch (error) {
    console.error('Error fetching products from Neon:', error);
    return NextResponse.json({ products: SEED_PRODUCTS, source: 'fallback_seed' });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Saved in offline mode', product: data });
    }
    const product = await prisma.product.create({
      data: {
        name: data.name,
        subtitle: data.subtitle,
        category: data.category,
        categoryId: data.categoryId,
        collectionId: data.collectionId,
        priceGhc: Number(data.priceGhc),
        originalPriceGhc: data.originalPriceGhc ? Number(data.originalPriceGhc) : null,
        discountPercent: data.discountPercent ? Number(data.discountPercent) : null,
        isNew: Boolean(data.isNew),
        isTrending: Boolean(data.isTrending),
        isSpotlight: Boolean(data.isSpotlight),
        rating: 5.0,
        reviewCount: 1,
        images: data.images || [],
        colors: data.colors || [],
        sizes: data.sizes || ['M'],
        variants: data.variants || [],
        fabric: data.fabric || '',
        craftsmanship: data.craftsmanship || '',
        description: data.description || '',
        careInstructions: data.careInstructions || '',
        stockStatus: data.stockStatus || 'in_stock',
      },
    });
    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updates } = data;
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Updated in offline mode' });
    }
    const product = await prisma.product.update({
      where: { id },
      data: updates,
    });
    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Deleted in offline mode' });
    }
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
