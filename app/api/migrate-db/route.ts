import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const client = await pool.connect();

        try {
            // Add selected and selected_at columns if they don't exist
            await client.query(`
        ALTER TABLE registrations 
        ADD COLUMN IF NOT EXISTS selected BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS selected_at TIMESTAMP;
      `);

            return NextResponse.json(
                {
                    message: 'Database migration completed successfully!',
                    changes: ['Added selected and selected_at columns to registrations table']
                },
                { status: 200 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json(
            { error: 'Failed to run migration', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
