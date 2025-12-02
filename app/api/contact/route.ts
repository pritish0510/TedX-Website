import { NextRequest, NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';
import { ContactInput, validateContact } from '@/models/Contact';
import { sendContactNotification } from '@/lib/email';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const body: ContactInput = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    const validation = validateContact({ name, email, subject, message });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Insert contact into database
    const result = await pool.query(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, subject, message, created_at`,
      [name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim()]
    );

    const contact = result.rows[0];

    // Send notification email to organizers
    try {
      await sendContactNotification(name, email, subject, message);
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We\'ll get back to you soon.',
        contactId: contact.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all contacts (for admin)
export async function GET(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const result = await pool.query(
      'SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    return NextResponse.json(
      { contacts: result.rows },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}