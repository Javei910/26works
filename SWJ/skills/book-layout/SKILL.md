---
name: Typst Layout Architect
description: Technical instructions for document structure and Typst code generation for the Somatic Integration Journal.
---

# Technical Blueprint: Somatic Journaling
The goal is to generate clean, print-ready Typst code that balances Art Nouveau elegance with functional journaling space.

## 1. Document Specifications
- **Page Size**: A5 (148mm x 210mm).
- **Margins**: 
    - Inside (Gutter): 25mm (to allow for binding).
    - Outside/Top/Bottom: 15mm.
- **Typography**:
    - **Body**: 'EB Garamond', size 11pt, leading 1.5em (extra space for readability).
    - **Headers**: 'Playfair Display', Bold, size 18pt-24pt.
    - **Captions/Quotes**: Italicized serif, centered.

## 2. Structural Rhythm (The 4-Page Cycle)
When generating content from Airtable, follow this layout sequence for every "Theme":
1.  **Page A (Intro)**: Large header, centered educational quote, and 2-3 paragraphs of introductory text.
2.  **Page B (Deep Dive)**: 3-5 prompt questions, each followed by exactly 4-6 dotted lines (`#line(length: 100%, stroke: (dash: "dotted"))`).
3.  **Page C (Somatic Map)**: A centered silhouette image (the body map) with a header "Where do you feel this?" and a small text box at the bottom.
4.  **Page D (Action/Ritual)**: A boxed section (gold border) containing the "Burn and Bloom" or "Ritual" instruction.

## 3. Typst Component Standards
- **Fill-in-the-Blanks**: Use `#v(1em); #line(length: 100%, stroke: 0.5pt + gray);` to create writing lines. Never leave a prompt without lines.
- **Boxes**: Use `#rect(stroke: 0.5pt + rgb("#D4AF37"), inset: 10pt)` for "Safety Containers" or "Notes."
- **QR Codes**: Place QR codes in a centered `#block` with a 2cm width.
- **Page Breaks**: Use `#pagebreak()` specifically between the Intro and the Prompts to ensure a clean visual start.

## 4. Visual Layering
- **Borders**: Every page should call the `#art-nouveau-border()` function (defined in `template.typ`).
- **White Space**: Maintain generous "Breathable Space." Shadow work is heavy; the layout must feel light and open. 
- **Page Numbers**: Place on the bottom-outer corner (alternating left/right for book spreads).

## 5. Execution Logic
- If the Airtable data is "Educational," use a single-column text layout.
- If the Airtable data is an "Exercise," prioritize horizontal lines for writing over long descriptions.
- Always check that the Typst code ends with a closing brace if using a template wrapper like `#show: project.with(...)`.