import { NextRequest, NextResponse } from 'next/server';
import { createProject } from '@/lib/airtable-client';
import type { ProductType } from '@/lib/validators';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, productType, customerEmail } = body;

        if (!token || !productType || !customerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await createProject({
            token,
            productType: productType as ProductType,
            customerEmail,
            status: 'awaiting_assets',
            createdDate: new Date(),
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Create project error:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
