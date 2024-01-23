import { revalidate } from '@/lib/shopify/webhooks';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
