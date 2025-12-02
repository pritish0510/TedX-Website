import { NextRequest, NextResponse } from 'next/server';
import { sendRegistrationConfirmation, sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    if (type === 'registration') {
      await sendRegistrationConfirmation(email, name);
      return NextResponse.json(
        { message: 'Registration confirmation email sent successfully!' },
        { status: 200 }
      );
    } else if (type === 'contact') {
      await sendContactNotification(
        name,
        email,
        'Test Subject',
        'This is a test message from the email testing endpoint.'
      );
      return NextResponse.json(
        { message: 'Contact notification email sent successfully!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Use "registration" or "contact"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
