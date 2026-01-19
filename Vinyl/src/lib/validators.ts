import { z } from 'zod';

/**
 * Product type codes matching Kunaki API specifications
 */
export const ProductType = z.enum([
    '12_vinyl',
    '7_vinyl',
    'cd_jewel',
    'cd_sleeve',
    'cassette'
]);

export type ProductType = z.infer<typeof ProductType>;

/**
 * Audio file validation (WAV or MP3)
 * Max duration: 20 minutes for  12" vinyl sides
 */
export const AudioFileSchema = z.object({
    file: z.instanceof(File),
    type: z.enum(['wav', 'mp3']),
    durationMinutes: z.number().max(20, 'Audio must be under 20 minutes'),
    sizeBytes: z.number().max(500 * 1024 * 1024, 'File must be under 500MB'),
});

/**
 * Image file validation
 * Must be JPEG or PNG, > 3000x3000px, RGB color space
 */
export const ImageFileSchema = z.object({
    file: z.instanceof(File),
    type: z.enum(['jpg', 'jpeg', 'png']),
    width: z.number().min(3000, 'Image must be at least 3000px wide'),
    height: z.number().min(3000, 'Image must be at least 3000px tall'),
    colorSpace: z.literal('RGB'),
    sizeBytes: z.number().max(50 * 1024 * 1024, 'File must be under 50MB'),
});

/**
 * Project status enum
 */
export const ProjectStatus = z.enum([
    'awaiting_assets',
    'ready_to_publish',
    'publishing',
    'ready_to_order',
    'completed',
    'action_required'
]);

export type ProjectStatus = z.infer<typeof ProjectStatus>;

/**
 * Complete project validation schema
 */
export const ProjectSchema = z.object({
    token: z.string().uuid(),
    orderId: z.string().optional(),
    status: ProjectStatus,
    productType: ProductType,
    customerEmail: z.string().email(),

    // Asset URLs (S3/R2)
    sideAAudioUrl: z.string().url().optional(),
    sideBAudioUrl: z.string().url().optional(),
    frontArtUrl: z.string().url().optional(),
    backArtUrl: z.string().url().optional(),
    labelArtUrl: z.string().url().optional(),
    innerSleeveUrl: z.string().url().optional(),

    // Kunaki integration
    kunakiProductId: z.string().length(10).optional(),

    // Design service
    designServiceRequired: z.boolean().default(false),
    designServiceComplete: z.boolean().default(false),

    // Shipping info
    shippingName: z.string().optional(),
    shippingAddress: z.string().optional(),
    shippingCity: z.string().optional(),
    shippingState: z.string().optional(),
    shippingZip: z.string().optional(),
    shippingCountry: z.string().optional(),

    // Metadata
    createdDate: z.date(),
    errorLog: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

/**
 * Helper function to validate audio file duration
 * Requires HTML5 Audio API
 */
export async function validateAudioFile(file: File): Promise<{
    valid: boolean;
    durationMinutes?: number;
    error?: string;
}> {
    return new Promise((resolve) => {
        const audio = new Audio();
        const url = URL.createObjectURL(file);

        audio.addEventListener('loadedmetadata', () => {
            const durationMinutes = audio.duration / 60;
            URL.revokeObjectURL(url);

            if (durationMinutes > 20) {
                resolve({
                    valid: false,
                    durationMinutes,
                    error: 'Audio exceeds 20-minute limit for vinyl pressing'
                });
            } else {
                resolve({ valid: true, durationMinutes });
            }
        });

        audio.addEventListener('error', () => {
            URL.revokeObjectURL(url);
            resolve({
                valid: false,
                error: 'Could not read audio file'
            });
        });

        audio.src = url;
    });
}

/**
 * Helper function to validate image dimensions and color space
 * Requires HTML5 Canvas API
 */
export async function validateImageFile(file: File): Promise<{
    valid: boolean;
    width?: number;
    height?: number;
    error?: string;
}> {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.addEventListener('load', () => {
            URL.revokeObjectURL(url);

            const { width, height } = img;

            if (width < 3000 || height < 3000) {
                resolve({
                    valid: false,
                    width,
                    height,
                    error: `Image dimensions ${width}x${height}px are too small. Minimum 3000x3000px required.`
                });
            } else {
                resolve({ valid: true, width, height });
            }
        });

        img.addEventListener('error', () => {
            URL.revokeObjectURL(url);
            resolve({
                valid: false,
                error: 'Could not read image file'
            });
        });

        img.src = url;
    });
}
