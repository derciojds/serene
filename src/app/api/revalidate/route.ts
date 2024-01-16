import { revalidate } from '@/services/shopify/webhooks';
import { NextRequest, NextResponse } from 'next/server';

export function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
