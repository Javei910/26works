import { NextRequest, NextResponse } from 'next/server';
import { updateProjectStatus } from '@/lib/airtable-client';
import type { ProjectStatus } from '@/lib/validators';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, status } = body;

        if (!token || !status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await updateProjectStatus(token, status as ProjectStatus);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update status error:', error);
        return NextResponse.json(
            { error: 'Failed to update status' },
            { status: 500 }
        );
    }
}
