import { getKunakiProductCode, PRODUCT_SPECS } from './product-mapping';
import type { ProductType } from '../validators';

export interface PublishingData {
    projectToken: string;
    productType: ProductType;
    sideAAudioUrl: string;
    sideBAudioUrl?: string;
    frontArtUrl: string;
    backArtUrl: string;
    labelArtUrl?: string;
    innerSleeveUrl?: string;
}

export interface OrderData {
    kunakiProductId: string;
    recipientName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    quantity?: number;
}

/**
 * Generate Kunaki Publishing XML
 * This XML is sent to https://Kunaki.com/XMLPublish.ASP
 */
export function generatePublishingXML(data: PublishingData): string {
    const productCode = getKunakiProductCode(data.productType);
    const specs = PRODUCT_SPECS[data.productType];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Product>
  <UserId>${process.env.KUNAKI_EMAIL}</UserId>
  <Password>${process.env.KUNAKI_PASSWORD}</Password>
  <ProductType>${productCode}</ProductType>
  <Title>${data.projectToken}</Title>
  <Description>Custom ${specs.name} - ${data.projectToken}</Description>
  
  <!-- Audio Assets -->
  <SideAUrl>${escapeXml(data.sideAAudioUrl)}</SideAUrl>`;

    // Add Side B if required
    if (specs.requiresSideB && data.sideBAudioUrl) {
        xml += `\n  <SideBUrl>${escapeXml(data.sideBAudioUrl)}</SideBUrl>`;
    }

    // Add artwork
    xml += `
  
  <!-- Artwork Assets -->
  <FrontArtUrl>${escapeXml(data.frontArtUrl)}</FrontArtUrl>
  <BackArtUrl>${escapeXml(data.backArtUrl)}</BackArtUrl>`;

    // Add label art for vinyl/cassette
    if (data.labelArtUrl && (data.productType.includes('vinyl') || data.productType === 'cassette')) {
        xml += `\n  <LabelArtUrl>${escapeXml(data.labelArtUrl)}</LabelArtUrl>`;
    }

    // Add inner sleeve if provided
    if (data.innerSleeveUrl) {
        xml += `\n  <InnerSleeveUrl>${escapeXml(data.innerSleeveUrl)}</InnerSleeveUrl>`;
    }

    xml += `\n</Product>`;

    return xml;
}

/**
 * Generate Kunaki Order XML
 * This XML is sent to https://Kunaki.com/XMLService.ASP
 */
export function generateOrderXML(data: OrderData): string {
    const quantity = data.quantity || 1;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Order>
  <UserId>${process.env.KUNAKI_EMAIL}</UserId>
  <Password>${process.env.KUNAKI_PASSWORD}</Password>
  
  <!-- Recipient Information -->
  <RecipientName>${escapeXml(data.recipientName)}</RecipientName>
  <StreetAddress>${escapeXml(data.streetAddress)}</StreetAddress>
  <City>${escapeXml(data.city)}</City>
  <State>${escapeXml(data.state)}</State>
  <PostalCode>${escapeXml(data.postalCode)}</PostalCode>
  <Country>${escapeXml(data.country)}</Country>
  
  <!-- Product to Order -->
  <Product>
    <ProductId>${escapeXml(data.kunakiProductId)}</ProductId>
    <Quantity>${quantity}</Quantity>
  </Product>
</Order>`;

    return xml;
}

/**
 * Helper function to escape XML special characters
 */
function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Submit Publishing XML to Kunaki
 * Returns the 10-character Product ID if successful
 */
export async function submitPublishing(xml: string): Promise<{ success: boolean; productId?: string; error?: string }> {
    try {
        const response = await fetch('https://Kunaki.com/XMLPublish.ASP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            },
            body: xml,
        });

        const responseText = await response.text();

        // Parse response for Product ID
        // Kunaki returns XML with <ProductId>XXXXXXXXXX</ProductId>
        const productIdMatch = responseText.match(/<ProductId>([A-Z0-9]{10})<\/ProductId>/i);

        if (productIdMatch && productIdMatch[1]) {
            return {
                success: true,
                productId: productIdMatch[1],
            };
        }

        // Check for error messages
        const errorMatch = responseText.match(/<Error>(.*?)<\/Error>/i);
        if (errorMatch && errorMatch[1]) {
            return {
                success: false,
                error: errorMatch[1],
            };
        }

        return {
            success: false,
            error: 'Unknown response format from Kunaki',
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Network error',
        };
    }
}

/**
 * Submit Order XML to Kunaki
 * Returns success status
 */
export async function submitOrder(xml: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch('https://Kunaki.com/XMLService.ASP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            },
            body: xml,
        });

        const responseText = await response.text();

        // Check for errors
        const errorMatch = responseText.match(/<Error>(.*?)<\/Error>/i);
        if (errorMatch && errorMatch[1]) {
            return {
                success: false,
                error: errorMatch[1],
            };
        }

        // Check for success confirmation
        if (responseText.includes('<Status>Success</Status>') || responseText.includes('OrderId')) {
            return { success: true };
        }

        return {
            success: false,
            error: 'Unknown response from Kunaki',
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Network error',
        };
    }
}
