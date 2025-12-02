import { NextRequest, NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';
import { RegistrationInput, validateRegistration } from '@/models/Registration';
import { sendRegistrationConfirmation } from '@/lib/email';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const body: RegistrationInput = await request.json();
    const { name, email, phone, role, message } = body;

    // Validate input
    const validation = validateRegistration({ name, email, phone, role, message });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Check if email already registered
    const existingResult = await pool.query(
      'SELECT id FROM registrations WHERE email = $1',
      [email.trim().toLowerCase()]
    );

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'This email is already registered for the event' },
        { status: 400 }
      );
    }

    // Insert registration into database
    const result = await pool.query(
      `INSERT INTO registrations (name, email, phone, role, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, phone, role, message, created_at`,
      [name.trim(), email.trim().toLowerCase(), phone.trim(), role, message.trim()]
    );

    const registration = result.rows[0];

    // Send confirmation email
    try {
      await sendRegistrationConfirmation(email, name);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue even if email fails - registration is still successful
    }

    return NextResponse.json(
      { 
        message: 'Registration successful! Confirmation email sent.',
        registrationId: registration.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all registrations (for admin)
export async function GET(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const result = await pool.query(
      'SELECT id, name, email, phone, role, message, created_at FROM registrations ORDER BY created_at DESC'
    );

    return NextResponse.json(
      { 
        registrations: result.rows,
        total: result.rows.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}