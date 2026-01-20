/**
 * JSON-LD Schema Injection for SEO & AI Discovery
 * Implements Organization, Product, and Person schemas
 */

export function injectSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://thefeltsense.com/#organization",
                "name": "The Felt Sense",
                "url": "https://thefeltsense.com",
                "logo": "https://thefeltsense.com/assets/marketing_01_cover.jpg",
                "sameAs": [
                    "https://www.instagram.com/monoworkla"
                ]
            },
            {
                "@type": "Person",
                "name": "The Felt Sense Author",
                "description": "Somatic Shadow Work Expert",
                "jobTitle": "Shadow Work Practitioner",
                "sameAs": []
            },
            {
                "@type": "Product",
                "name": "The Felt Sense: Somatic Shadow Work Journal",
                "description": "A 130-page somatic journal bridging Jungian depth with body-based integration. Release trauma where it lives: in your nervous system.",
                "image": "https://thefeltsense.com/assets/marketing_01_cover.jpg",
                "brand": { "@id": "https://thefeltsense.com/#organization" },
                "offers": {
                    "@type": "Offer",
                    "price": "17.00",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "url": "https://buy.stripe.com/7sYdRb0Bz6Hs5SSdbz67S00"
                }
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}
