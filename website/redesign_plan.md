# Redesign Plan: Somatic & Earthy Aesthetic

## 1. Visual Identity (The Vibe)
- **Palette**: Oatmeal (#F5F2ED) Background, Sage (#8A9A5B) & Terra Cotta (#C27D60) Accents, Charcoal (#333333) Text.
- **Typography**: 
  - Headers: *Playfair Display* (Elegant Serif)
  - Subtitles: *La Belle Aurore* (Handwritten/Journal style)
  - Body: *Montserrat* (Clean Sans-serif)
- **Styling**: 24px rounded corners, paper textures, watercolor/organic background shapes.

## 2. New Sections & Features
### A. The Action Gap (Comparison)
Two soft cards side-by-side:
- **Traditional Journals ("The Flashlight")**: Focus on excavation/loops.
- **This Workbook ("The Renovation Crew")**: Focus on somatic integration/micro-actions.

### B. Interactive Body Map
- **Visual**: Artistic human silhouette.
- **Interaction**: Hovering over Heart/Gut/Throat triggers popups referencing specific workbook pages (e.g., "The Gut: Page 42").

### C. Safety Container
- Highlight "Pre-Excavation Safety" with icons:
  - Nervous System Regulation
  - EFT Tapping
  - Safety Anchors

### D. "Look Inside" (CSV Integration)
- A horizontal scrolling carousel.
- Dynamically loads chapters/pages from `shadow_workbook_pages_final.csv`.

## 3. Implementation Steps
1.  **Generate Assets**: Create the linen journal image, body silhouette, organic shapes, and paper textures.
2.  **CSS Overhaul**: Rewrite `style.css` to match the new color palette and typography.
3.  **HTML Restructuring**: Update `index.html` to include the new sections (Body Map, Action Gap, etc.).
4.  **JS Logic**: Add code to read the CSV file and handle the Body Map interactions.
