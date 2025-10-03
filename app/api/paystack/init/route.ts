// import { NextRequest, NextResponse } from 'next/server';
// import { createPaystackTransaction } from '@/lib/actions/order.actions';

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const orderId = searchParams.get('orderId') as string;

//   if (!orderId) {
//     return NextResponse.json({ success: false, message: 'Missing orderId' });
//   }

//   const result = await createPaystackTransaction(orderId);
//   return NextResponse.json(result);
// }

import { NextRequest, NextResponse } from 'next/server';
import { createPaystackTransaction } from '@/lib/actions/order.actions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debug: any = {
      orderId,
      hasKey: !!process.env.PAYSTACK_SECRET_KEY,
    };

    if (!orderId || orderId === 'undefined') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or missing orderId',
          debug: { orderId },
        },
        { status: 400 }
      );
    }

    const result = await createPaystackTransaction(orderId);

    return NextResponse.json({ success: true, result, debug });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Payment init failed',
        error: err?.message,
        debug: {
          stack: err?.stack,
          response: err?.response?.data || null,
          hasKey: !!process.env.PAYSTACK_SECRET_KEY,
        },
      },
      { status: 400 }
    );
  }
}
