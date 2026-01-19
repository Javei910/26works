import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3/R2 client
const s3Client = new S3Client({
    region: process.env.S3_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const PUBLIC_URL = process.env.S3_PUBLIC_URL!;

export interface UploadOptions {
    projectToken: string;
    fieldName: string; // e.g., 'sideA_audio', 'front_art'
    file: Buffer;
    contentType: string;
    fileExtension: string;
}

/**
 * Upload a file to S3/R2
 * Returns the public URL
 */
export async function uploadFile(options: UploadOptions): Promise<string> {
    const { projectToken, fieldName, file, contentType, fileExtension } = options;

    // Generate unique filename
    const uniqueId = uuidv4();
    const key = `projects/${projectToken}/${fieldName}_${uniqueId}.${fileExtension}`;

    // Upload to S3/R2
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType,
    });

    await s3Client.send(command);

    // Return public URL
    return `${PUBLIC_URL}/${key}`;
}

/**
 * Generate a signed URL for temporary access (if bucket is private)
 * Expires in 1 hour
 */
export async function getSignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

/**
 * Helper to upload from a File object (browser)
 */
export async function uploadFileFromBrowser(
    projectToken: string,
    fieldName: string,
    file: File
): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileExtension = file.name.split('.').pop() || '';

    return uploadFile({
        projectToken,
        fieldName,
        file: buffer,
        contentType: file.type,
        fileExtension,
    });
}
