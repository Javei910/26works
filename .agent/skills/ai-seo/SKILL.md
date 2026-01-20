---
description: Optimize websites for 2026 Search (Google) and Answer Engines (ChatGPT, Perplexity). Implements the "Ralph Protocol" for Machine Discovery, Entity Clarity, and Real-Time Indexing.
---

# AI & SEO Optimization Skill (The "Ralph" Protocol)

Use this skill when the user wants to optimize a website for visibility in both traditional search engines (Google/Bing) and AI Answer Engines (ChatGPT, Gemini, Perplexity).

## The Strategy
This is not just keyword optimization; it is **Knowledge Graph Construction**.
1.  **Machine Discovery**: Force AI to read verified facts (`llms.txt`).
2.  **Entity Clarity**: Speak "Schema" to engines (JSON-LD).
3.  **Real-Time Push**: Zero-latency indexing (IndexNow + Google Search Console).

## Phase 1: Machine Discovery (The "Brief")
**Goal**: Create a "Source of Truth" for AI agents.

### 1. `public/llms.txt`
Create a Markdown file at the root.
-   **Structure**:
    -   **H1**: Brand Name.
    -   **Blockquote**: 1-3 sentence factual summary (No fluff).
    -   **Sections**: Core Offerings, Pricing, Contact.
    -   **Footer**: Link to `sitemap.xml`.

### 2. `public/robots.txt`
Explicitly allow high-value AI bots.
```txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

Sitemap: https://[domain]/sitemap.xml
```

## Phase 2: Entity Clarity (The "Details")
**Goal**: Define relationships (Brand ↔ Product ↔ Author).

### 1. JSON-LD Schema
**CRITICAL: Use static HTML, NOT JavaScript injection.**

Add the Schema directly in the `<head>` section of `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yourdomain.com/#organization",
      "name": "Your Brand",
      "url": "https://yourdomain.com",
      "sameAs": ["https://instagram.com/yourhandle"]
    },
    {
      "@type": "Product",
      "name": "Your Product",
      "description": "Product description here",
      "price": "17.00",
      "priceCurrency": "USD"
    }
  ]
}
</script>
```

**Why Static?** Search engines crawl HTML before JavaScript executes. Static Schema guarantees visibility.

### 2. Semantic HTML & ARIA
Refactor generic `div`s into meaningful landmarks for AI accessibility.
-   `<main>`: Primary content.
-   `<header>` / `<footer>`: Context.
-   `<article>`: Standalone content units.
-   `<nav>`: Navigation.
-   **ARIA**: Add `aria-label` to all interactive elements (buttons, sliders, toggles).

## Phase 3: Google Search Console Setup

### Step 1: Verification (Choose One Method)

**Option A: HTML Meta Tag (Easiest - RECOMMENDED)**
1. Add this to your `<head>` section:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```
2. Upload your site
3. Click "Verify" in Search Console

**Option B: HTML File Upload (Backup)**
1. Download the verification file from Google
2. Place it in `public/` folder
3. Rebuild (`npm run build`) to copy to `out/`
4. Upload to hosting
5. Click "Verify"

**Don't Use:** Google Analytics or Tag Manager verification (requires additional setup not needed for basic SEO).

### Step 2: Submit Sitemap
After verification:
1. Go to "Sitemaps" in Search Console
2. Enter: `sitemap.xml`
3. Click "Submit"

**Result:** Google indexes your site in 24-48 hours.

## Phase 4: IndexNow (Optional - For Bing)
**Goal:** Notify Bing/Yandex instantly upon deployment.

1. Generate a 32-char hex key: `openssl rand -hex 16`
2. Save as `public/[key].txt`
3. Trigger POST to `https://api.indexnow.org/indexnow` in build pipeline

**Note:** IndexNow works for Bing/Yandex, NOT Google. Google uses Search Console.

## Phase 5: Verification
1.  **Rich Results Test**: Validate JSON-LD at https://search.google.com/test/rich-results
2.  **AI Simulation**: Feed `llms.txt` to an LLM and ask it to summarize the brand.
3.  **Lighthouse**: Verify Accessibility score > 95.

## Key Learnings

**JSON-LD:**
- ✅ Hardcode in HTML `<head>`
- ❌ Don't use JavaScript injection (unreliable for crawlers)

**Google Search Console:**
- ✅ Use Meta Tag method (simplest)
- ✅ HTML File method (backup)
- ❌ Skip Analytics/Tag Manager (unnecessary for basic verification)

**IndexNow:**
- Works for Bing/Yandex, NOT Google
- Google uses Search Console instead
