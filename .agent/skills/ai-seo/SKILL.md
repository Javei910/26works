---
description: Optimize websites for 2026 Search (Google) and Answer Engines (ChatGPT, Perplexity). Implements the "Ralph Protocol" for Machine Discovery, Entity Clarity, and Real-Time Indexing.
---

# AI & SEO Optimization Skill (The "Ralph" Protocol)

Use this skill when the user wants to optimize a website for visibility in both traditional search engines (Google/Bing) and AI Answer Engines (ChatGPT, Gemini, Perplexity).

## The Strategy
This is not just keyword optimization; it is **Knowledge Graph Construction**.
1.  **Machine Discovery**: Force AI to read verified facts (`llms.txt`).
2.  **Entity Clarity**: Speak "Schema" to engines (JSON-LD).
3.  **Real-Time Push**: Zero-latency indexing (IndexNow).

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
Inject strictly typed Schema.org data into `<head>`.
-   **Organization**: Connects Logo, URL, and Social Profiles (`sameAs`).
-   **Product**: Connects to Organization. Includes Price, Currency.
-   **Person**: Connects as "Author" or "Founder". Builds E-E-A-T.

### 2. Semantic HTML & ARIA
Refactor generic `div`s into meaningful landmarks for AI accessibility.
-   `<main>`: Primary content.
-   `<header>` / `<footer>`: Context.
-   `<article>`: Standalone content units.
-   `<nav>`: Navigation.
-   **ARIA**: Add `aria-label` to all interactive elements (buttons, sliders, toggles).

## Phase 3: Real-Time Indexing (The "Push")
**Goal**: Notify engines instantly upon deployment.

### 1. IndexNow
-   Generate a 32-char hex key.
-   Save as `public/[key].txt`.
-   Trigger a POST request to `https://api.indexnow.org/indexnow` in the build/deploy pipeline.

## Phase 4: Verification
1.  **Rich Results Test**: Validate JSON-LD.
2.  **AI Simulation**: Feed `llms.txt` to an LLM and ask it to summarize the brand.
3.  **Lighthouse**: Verify Accessibility score > 95.
