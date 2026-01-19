import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/s3-client';
import { updateProjectAssets } from '@/lib/airtable-client';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const file = formData.get('file') as File;
        const token = formData.get('token') as string;
        const fieldName = formData.get('fieldName') as string;

        if (!file || !token || !fieldName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to S3/R2
        const url = await uploadFile({
            projectToken: token,
            fieldName,
            file: buffer,
            contentType: file.type,
            fileExtension: file.name.split('.').pop() || '',
        });

        // Update Airtable with the URL
        const assetUpdate: Record<string, string> = {};
        assetUpdate[`${fieldName}Url`] = url;

        await updateProjectAssets(token, assetUpdate as any);

        return NextResponse.json({ url, status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
