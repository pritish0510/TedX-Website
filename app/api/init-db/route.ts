import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    
    return NextResponse.json(
      { 
        message: 'Database initialized successfully!',
        tables: ['registrations', 'contacts']
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
