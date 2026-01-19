# VinylFlow

An autonomous print-on-demand ecosystem for physical media (Vinyl, CD, DVD) using Kunaki as the manufacturer.

## Features

- ✨ **Premium 3D Preview**: Interactive vinyl and album jacket visualization with Three.js
- 🎨 **Luxury Design**: Premium glassmorphism UI inspired by vinylacy.com
- 📦 **Automated Fulfillment**: Full integration with Kunaki manufacturing API
- 💾 **Cloud Storage**: Cloudflare R2/AWS S3 for asset management
- 📊 **Airtable Backend**: Powerful database for order tracking
- 🔄 **n8n Automation**: Automated workflows from order to delivery

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Database**: Airtable
- **Storage**: AWS S3 / Cloudflare R2
- **Authentication**: Supabase Auth
- **Automation**: n8n workflows
- **Manufacturing**: Kunaki XML API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Airtable account and API key
- AWS S3 or Cloudflare R2 bucket
- Kunaki account
- Supabase project (optional, for auth)
- n8n instance (for automation)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd Vinyl
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.example` for all required environment variables. Key services:

- **Airtable**: API key and base ID
- **S3/R2**: Bucket name, region, access keys, endpoint
- **Kunaki**: Email and password
- **Supabase**: URL and anon key (optional)
- **n8n**: Webhook URL

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── studio/       # Customizer studio
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── VinylPreview3D.tsx
│   │   └── FileUploader.tsx
│   └── lib/              # Utilities and integrations
│       ├── validators.ts
│       ├── airtable-client.ts
│       ├── s3-client.ts
│       └── kunaki/
│           ├── product-mapping.ts
│           └── xml-builder.ts
```

## Usage

1. **Select Product Type**: Choose from 12" Vinyl, 7" Vinyl, CD, or Cassette
2. **Upload Assets**: Provide audio files and artwork (validated automatically)
3. **Preview in 3D**: See your vinyl record rendered in real-time
4. **Submit**: Files upload to S3, project creates in Airtable
5. **Automation**: n8n workflows handle Kunaki publishing and ordering

## Kunaki Integration

The system supports two methods for Kunaki integration:

1. **XML API** (Primary): Direct API calls to Kunaki endpoints
2. **Playwright Automation** (Fallback): Headless browser automation if XML fails

### Product Mappings

| Internal Code | Kunaki  Code | Description |
|--------------|-------------|-------------|
| 12_vinyl     | Vinyl12Inch | 12" Vinyl Record |
| 7_vinyl      | Vinyl7Inch  | 7" Vinyl Record |
| cd_jewel     | CDJewelCase | CD with Jewel Case |
| cd_sleeve    | CDCardboardJacket | CD with Cardboard Sleeve |
| cassette     | CassetteNorelco | Cassette Tape |

## n8n Workflows

Three main workflows power the automation:

1. **Order Intake**: WooCommerce → Airtable → Email
2. **Publishing Bridge**: Airtable → Kunaki XML API → Product ID
3. **Fulfillment Order**: Airtable → Kunaki Order API → Tracking

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

## Support

For issues or questions, please open a GitHub issue.
