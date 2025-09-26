import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { success: false, message: 'Missing file URL' },
        { status: 400 }
      );
    }

    const fileKey = url.split('/').pop();
    if (!fileKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid file URL' },
        { status: 400 }
      );
    }

    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
