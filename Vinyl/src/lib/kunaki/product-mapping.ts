import type { ProductType } from '../validators';

/**
 * Kunaki Product Type Mapping
 * Maps internal product codes to Kunaki API product codes
 */
export const KUNAKI_PRODUCTS: Record<ProductType, string> = {
    '12_vinyl': 'Vinyl12Inch',
    '7_vinyl': 'Vinyl7Inch',
    'cd_jewel': 'CDJewelCase',
    'cd_sleeve': 'CDCardboardJacket',
    'cassette': 'CassetteNorelco',
};

/**
 * Get Kunaki product code from internal product type
 */
export function getKunakiProductCode(productType: ProductType): string {
    return KUNAKI_PRODUCTS[productType];
}

/**
 * Product specifications for each type
 * Used for validation and UI hints
 */
export const PRODUCT_SPECS: Record<ProductType, {
    name: string;
    requiresSideB: boolean;
    maxAudioDuration: number; // minutes
    requiredAssets: string[];
}> = {
    '12_vinyl': {
        name: '12" Vinyl Record',
        requiresSideB: true,
        maxAudioDuration: 20,
        requiredAssets: ['sideA_audio', 'sideB_audio', 'front_art', 'back_art', 'label_art'],
    },
    '7_vinyl': {
        name: '7" Vinyl Record',
        requiresSideB: true,
        maxAudioDuration: 6,
        requiredAssets: ['sideA_audio', 'sideB_audio', 'front_art', 'back_art', 'label_art'],
    },
    'cd_jewel': {
        name: 'CD (Jewel Case)',
        requiresSideB: false,
        maxAudioDuration: 80,
        requiredAssets: ['sideA_audio', 'front_art', 'back_art'],
    },
    'cd_sleeve': {
        name: 'CD (Cardboard Sleeve)',
        requiresSideB: false,
        maxAudioDuration: 80,
        requiredAssets: ['sideA_audio', 'front_art', 'back_art'],
    },
    'cassette': {
        name: 'Cassette Tape',
        requiresSideB: true,
        maxAudioDuration: 30,
        requiredAssets: ['sideA_audio', 'sideB_audio', 'front_art'],
    },
};
