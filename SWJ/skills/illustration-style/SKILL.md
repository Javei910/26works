---
name: Art Nouveau Botanical Art Director
description: Specialized instructions for categorizing and generating visual prompts based on folder-specific style references.
---

# Visual Philosophy: Alchemical Art Nouveau
The style must blend the "Shadow" (darkness, depth, subconscious) with "Somatic Growth" (botanical life, roots, blooming). 

## 1. Core Aesthetic Rules
- **Line Work**: Use "whiplash curves" and thick-to-thin organic lines characteristic of Alphonse Mucha.
- **Framing**: Every major exercise page must have an ornate botanical border. Vines, thorns, and roots should "grow" into the text area.
- **Somatic Mapping**: When representing the body (silhouettes), the "organs" or "pain points" should be represented by flowers or fungi (e.g., anxiety in the chest = a tangled briar patch; peace in the belly = a blooming lily).
- **Shadow Contrast**: Use high-contrast silhouettes. The "Shadow Self" is a dark, solid shape, while the "Integrated Self" is filled with intricate botanical patterns.

## 2. Color Palette (The Alchemical Garden)
- **CRITICAL: ALL IMAGES MUST HAVE A PURE WHITE (#FFFFFF) BACKGROUND.** No black, dark, yellowish, cream, beige, or colored backgrounds allowed.
- **IMPORTANT: All illustrations are BLACK AND WHITE with GRAYSCALE only.** No color images.
- **Primary**: Deep Charcoal (#1A1A1A) for line art on PURE WHITE (#FFFFFF) background only.
- **Accents**: Muted Sage Green, Dusty Rose, and Metallic Gold line work (for digital/web only, not print illustrations).
- **Shadow Tones**: Ink-wash textures for areas representing the unconscious.
- **Background Rule**: The background must always be PURE WHITE. Do NOT use "aged parchment," "cream," "vintage paper," or any yellowish/beige tones - these create print issues.
- **PROMPT WARNING**: Never use the words "parchment," "vintage paper," "cream," "aged," or "antique" in background descriptions - these cause yellowish tints.

## 3. Botanical Symbolism & Alchemical Mapping

Use this reference table to select appropriate visual metaphors for each shadow work theme:

| **Theme/Emotion** | **Botanical Metaphor** | **Alchemical Symbol** |
|-------------------|------------------------|----------------------|
| **Ego / Persona** | A gilded, hollow pomegranate or a heavy iron mask covered in gold leaf. | The Sun (Sol ☉) but stylized with a hard, sharp edge. |
| **Inner Child** | A single Snowdrop or a fern uncurling from within a gnarled, protective root. | A glowing Mercury (☿) sign inside a glass bell jar. |
| **Fear / Anxiety** | Tangled Thistle, Nightshade berries, or "Strangler Vines" wrapping around a heart. | A storm cloud raining lead (♄) weights. |
| **Shame** | Poison Ivy or a deep, dark pool of water reflecting a wilted lily. | The Ouroboros (snake eating tail) but made of thorns. |
| **Anger / Rage** | A blooming Cactus with crystalline thorns or a burst of wildfire-colored poppies. | Calcination (a stylized flame consuming a crown). |
| **Suppression** | A birdcage made of living vines with a silent Nightingale inside. | A sealed alchemical flask (Retort) with black smoke inside. |
| **Integration** | The "Alchemical Marriage": A vine and a rose-stalk intertwining into a single bloom. | The Rebis or the union of Sun and Moon (Coincidentia Oppositorum ☉☽). |

**Additional Symbolism:**
- **Healing/Integration**: Irises, lotuses, or rising saplings.
- **Ancestral Work**: Deep, gnarled oak roots or mycelium networks.

## 4. Prompt Engineering Standard
When asked to generate an image prompt for this book, always append this suffix:
> "In the style of Art Nouveau lithography, Alphonse Mucha and Ernst Haeckel. Intricate botanical line art, high contrast, alchemical symbolism, muted earth tones with gold filigree, symmetrical composition, 8k resolution, print-ready engraving style."

- **ALL ILLUSTRATIONS MUST BE BLACK AND WHITE WITH GRAYSCALE ONLY.** No color images allowed.
- NO 3D renders or photorealistic elements.
- NO modern geometric shapes (circles must be hand-drawn/organic).
- NO bright neon colors (or any colors at all - grayscale only).
- Maintain a "vintage journal" feel, as if the book was found in a 19th-century library.

---

# Image Composition Rules (Critical Update)

## Background Requirements
- **ONLY generate images with pure white background (#FFFFFF) or transparent/no background.**
- NEVER use cream, beige, parchment, aged paper, or any colored/tinted backgrounds.
- Add `--no background` or explicitly state "PURE WHITE BACKGROUND" in every prompt.

## Style Reference: Baghdad Herbal
- The line-art style must match the **'Baghdad Herbal'** manuscript references exactly.
- Study the botanical illustrations in `assets/image references/` for the specific line weight, organic curves, and medieval-meets-Art-Nouveau aesthetic.
- Lines should feel hand-drawn, not vector-perfect.

## Bleeding Edge Composition
- **The art must feel like it is "bleeding" into the page, not trapped in a square box.**
- Images should NOT have hard rectangular borders or frames.
- Vines, roots, and botanical elements should extend outward and fade or bleed off the edges.
- Create the illusion that the illustration grows organically from/into the page margins.
- Use asymmetrical compositions where elements escape the "invisible frame."

---

# Visual Intelligence & Style Matching

You are the Art Director for the SWJ project. You must maintain a cohesive "Alchemical Art Nouveau" aesthetic across 130 pages.

## Rule 1: Category-Specific Matching

When generating an image prompt or visual description, first determine which category the subject belongs to. Look at the corresponding subfolder in `assets/refs/` to mirror its specific DNA (line weight, composition, shading).

- **Category: PAGE STRUCTURE** → Reference `assets/refs/borders/`.
- **Category: EMOTIONAL SYMBOLISM** → Reference `assets/refs/metaphors/`.
- **Category: ANATOMY/SOMATIC** → Reference `assets/refs/somatic-maps/`.
- **Category: THEORY/DIAGRAMS** → Reference `assets/refs/models/`.
- **Category: BRANDING/LOGOS** → Reference `assets/refs/functional/`.

## Rule 2: The "Fallthrough" Global Style

If a requested image does not clearly fit into one of the categories above, you must apply the **"Project DNA"** derived from the aggregate of all reference folders:
- **Medium**: High-contrast ink lithograph / Etching.
- **Texture**: Aged cream parchment background, zero digital gradients.
- **Line Style**: Variable width (thick to hair-thin), organic "whiplash" curves, no perfect geometric circles (unless hand-drawn).
- **Vibe**: 19th-century Victorian occult journal.

## Rule 3: Visual Metaphor Requirement

- NEVER produce literal clipart (e.g., a "sad face").
- If the subject is an emotion, you MUST consult the `writing-style` skill to find the correct botanical metaphor first, then look in `assets/refs/metaphors/` for the visual execution.

---

# Prompt Construction Standard

Every image prompt you generate for external tools must follow this structure:

```
"[Subject Description] in the style of [Specific File in Folder]. High-contrast ink line art, Art Nouveau composition, alchemical symbolism, professional book illustration, 8k, print-ready."
```

**Example:**
```
"A human silhouette with tangled thistle vines in the chest area, in the style of Ernst Haeckel botanical studies. High-contrast ink line art, Art Nouveau composition, alchemical symbolism, professional book illustration, 8k, print-ready."
```