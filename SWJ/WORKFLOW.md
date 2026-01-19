# Somatic Shadow Work Journal - Book Generation Workflow

## Overview

This document describes the complete workflow to generate the Somatic Shadow Work Journal using Typst and the three skill files.

---

## File Structure

```
SWJ/book/
├── template.typ          # Page templates and project wrapper
├── main.typ              # Development sandbox (single page preview)
├── main-complete.typ     # Final book assembly (all pages)
├── pages/                # Individual page files
│   ├── title.typ
│   ├── copyright.typ
│   ├── intro.typ
│   ├── declaration.typ
│   ├── page-3.typ through page-47.typ
│   ├── daily-log-template.typ
│   ├── blank-journal-template.typ
│   └── blank-somatic-map-template.typ
├── assets/
│   ├── generated images/     # AI-generated somatic maps
│   └── refs/functional/      # Brand seal for footer
└── final-pdfs/               # Compiled output
```

---

## The Three Skills

| Skill | Role | Key Rules |
|-------|------|-----------|
| **writing-style** | Content creation | Theory Sandwich: Quote → 200-word somatic explanation → Mad-Lib exercise |
| **book-layout** | Typst code structure | A5 size, 30mm gutter, 4-page cycle per phase, 2+ interactive components |
| **illustration-style** | Image generation | Black & white only, pure white background, Art Nouveau style |

---

## Workflow: Creating a New Page

### Step 1: Write Content
Apply the **Theory Sandwich** structure:
1. Open with a deep quote (Jung, Rumi, Rilke)
2. Write 200 words of somatic explanation (how it feels in the body)
3. Add Mad-Lib structured prompts (never open-ended questions)

### Step 2: Build the Page File
Create a `.typ` file in `pages/` folder using:
- `#rect` with gray fill for theory blocks
- `#rect` with gold stroke for safety containers
- `#line` with dotted stroke for writing lines
- `#v(1em)` for vertical spacing

### Step 3: Preview in main.typ
1. Edit `main.typ` to include your new page
2. Compile: `typst compile main.typ --root .`
3. Review the PDF

### Step 4: Add to main-complete.typ
Once approved:
1. Add `#include "pages/your-page.typ"` to `main-complete.typ`
2. Add `#pagebreak()` after each include

---

## Workflow: Generating an Image

### Step 1: Determine the Theme
Use the botanical symbolism table:
- Inner Child → Snowdrop, fern
- Fear → Tangled thistle, strangler vines
- Integration → Intertwined vine and rose

### Step 2: Generate with Correct Prompt
Always include:
- "PURE WHITE BACKGROUND"
- "Black and white with grayscale only"
- Style suffix from illustration-style skill

### Step 3: Save to assets/generated images/
Name format: `phase[N]-somatic.jpg`

---

## Workflow: Final Book Compilation

1. Open `main-complete.typ`
2. Verify `show_numbers: true` is set
3. Verify all pages are included in order
4. Run: `typst compile main-complete.typ final-pdfs/shadow-work-journal-complete.pdf --root .`

---

## Quick Reference: Page Types

| Page Type | Structure |
|-----------|-----------|
| **Intro** | Quote + 200w theory + divider |
| **Prompts** | Mirroring statement + Mad-Lib prompts + dotted lines |
| **Somatic Map** | Body silhouette image + annotation instructions |
| **Ritual** | Gold-bordered box with embodied practice |
| **Template** | Repeatable blank pages for journaling |

---

## Key Rules Summary

1. **Never list open questions.** Use structured fill-in-the-blanks.
2. **Never use black backgrounds.** Pure white only for images.
3. **Every 100 words needs a Somatic Check-in box.**
4. **Exercise pages need 2+ interactive components.**
5. **Use `main.typ` for development, `main-complete.typ` for final assembly.**
