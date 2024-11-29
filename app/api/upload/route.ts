import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // In a real application, you would upload this to a storage service
    // For demo purposes, we'll create a fake URL
    const fileUrl = URL.createObjectURL(file);
    
    return NextResponse.json({ fileUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}