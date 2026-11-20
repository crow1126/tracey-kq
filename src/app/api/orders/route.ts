import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ orders: [], source: 'offline' });
    }
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ orders, source: 'neon' });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ orders: [], error: 'Could not fetch orders' });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Saved in offline mode', order: data });
    }
    const order = await prisma.order.create({
      data: {
        orderNumber: data.orderNumber || `TKQ-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deliveryAddress: data.deliveryAddress,
        city: data.city,
        deliveryZone: data.deliveryZone,
        deliveryFeeGhc: Number(data.deliveryFeeGhc || 0),
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus || 'Pending',
        subtotalGhc: Number(data.subtotalGhc),
        discountGhc: Number(data.discountGhc || 0),
        totalGhc: Number(data.totalGhc),
        status: data.status || 'Packed',
        date: data.date || new Date().toISOString(),
        estimatedDelivery: data.estimatedDelivery || '2-3 Business Days',
        items: data.items || [],
        riderName: data.riderName,
        riderPhone: data.riderPhone,
        trackingTimeline: data.trackingTimeline || [],
      },
    });
    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    console.error('Error creating order:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, riderName, riderPhone, trackingTimeline } = await req.json();
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Status updated offline' });
    }
    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(riderName !== undefined && { riderName }),
        ...(riderPhone !== undefined && { riderPhone }),
        ...(trackingTimeline && { trackingTimeline }),
      },
    });
    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    console.error('Error updating order status:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
