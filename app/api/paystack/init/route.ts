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

    console.log('🔍 Paystack Init Request Received');
    console.log('➡️ OrderId:', orderId);
    console.log(
      '➡️ PAYSTACK_SECRET_KEY present?',
      !!process.env.PAYSTACK_SECRET_KEY
    );

    if (!orderId) {
      console.error('❌ Missing orderId in request');
      return NextResponse.json(
        { success: false, message: 'Missing orderId' },
        { status: 400 }
      );
    }

    // call your Paystack transaction creator
    const result = await createPaystackTransaction(orderId);

    console.log('✅ Paystack Transaction Init Result:', result);

    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(
      '❌ Paystack Init Error:',
      err?.response?.data || err?.message || err
    );

    return NextResponse.json(
      { success: false, message: 'Payment init failed', error: err?.message },
      { status: 400 }
    );
  }
}
