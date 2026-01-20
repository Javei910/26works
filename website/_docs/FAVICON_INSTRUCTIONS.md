# Favicon Setup Instructions

## What You Need

Create these two files and place them in `website/public/`:

1. **`favicon-48x48.png`** - 48×48 pixels (square)
2. **`apple-touch-icon.png`** - 180×180 pixels (square)

## Why This Matters

Without proper favicons:
- ❌ Your site shows a generic circle in Google Search (like your screenshot)
- ❌ No branding on iOS home screens
- ❌ Looks unprofessional

With proper favicons:
- ✅ Your logo shows in Google Search results
- ✅ Professional appearance
- ✅ Better brand recognition

## How to Create

### Option A: Free Online Tool (Easiest)
1. Go to: https://realfavicongenerator.net/
2. Upload your logo/icon
3. Generate all sizes
4. Download the package
5. Extract `favicon-48x48.png` and `apple-touch-icon.png`
6. Place both files in `website/public/`

### Option B: Manual Creation
1. Open your logo in Photoshop/Figma/Canva
2. Create 48×48px version (simple, high contrast)
3. Export as PNG: `favicon-48x48.png`
4. Create 180×180px version (more detailed)
5. Export as PNG: `apple-touch-icon.png`
6. Place both in `website/public/`

## Design Tips

- **Simple is better** at 48×48px
- **High contrast** (dark icon on light background or vice versa)
- **Perfect square** (1:1 aspect ratio)
- **Clear edges** (no transparency for Google Search)

## After You Add the Files

1. Run: `npm run build`
2. The favicons will be copied to `out/`
3. Upload `out/` to Hostinger
4. Google will pick up the favicon within 24-48 hours

---

**I've already added the HTML code** - you just need to create the image files!
