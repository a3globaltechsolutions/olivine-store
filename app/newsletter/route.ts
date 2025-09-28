import { prisma } from '@/db/prisma';
import { APP_NAME, SERVER_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Save to DB (ignore if already exists)
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Send confirmation email
    await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: email,
      subject: 'Welcome to Olivine Fashion Boutique Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <h1 style="color: #FF6600; font-size: 24px; margin: 0;">${APP_NAME}</h1>
            <img 
              src="${SERVER_URL}/images/logo.svg" 
              alt="Olivine Fashion Boutique Logo" 
              style="max-width: 150px; height: auto;" 
            />
          </div>
          <h2>Welcome to our Newsletter 🎉</h2>
          <p>Thanks for subscribing to <b>Olivine Fashion Boutique</b>.</p>
          <p>You’ll be the first to know about new arrivals, special offers, and exclusive discounts!</p>
          <p style="margin-top: 30px; font-size: 12px; color: #888;">
            If you did not subscribe, you can ignore this email.
          </p>
        </div>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber: <b>${email}</b></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { active: false },
    });

    return NextResponse.json({
      message: 'You have unsubscribed successfully.',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }
}
