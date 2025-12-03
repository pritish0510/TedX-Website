import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendSelectionConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { participantId, selected } = body;

        if (!participantId) {
            return NextResponse.json(
                { error: 'Participant ID is required' },
                { status: 400 }
            );
        }

        // Get participant details
        const participantResult = await pool.query(
            'SELECT name, email, selected FROM registrations WHERE id = $1',
            [participantId]
        );

        if (participantResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Participant not found' },
                { status: 404 }
            );
        }

        const participant = participantResult.rows[0];

        // Update selection status
        const updateResult = await pool.query(
            `UPDATE registrations 
       SET selected = $1, selected_at = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, name, email, selected, selected_at`,
            [selected, selected ? new Date() : null, participantId]
        );

        const updatedParticipant = updateResult.rows[0];

        // Send selection confirmation email only if newly selected
        if (selected && !participant.selected) {
            try {
                await sendSelectionConfirmation(participant.email, participant.name);
            } catch (emailError) {
                console.error('Error sending selection email:', emailError);
                // Continue even if email fails - selection is still successful
            }
        }

        return NextResponse.json(
            {
                message: selected ? 'Participant selected and email sent' : 'Selection removed',
                participant: updatedParticipant
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Selection error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}
