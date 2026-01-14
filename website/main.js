
document.addEventListener('DOMContentLoaded', () => {
    // --- Body Map Popup Data (loaded from CSV) ---
    const bodyMappings = {
        throat: { title: 'The Throat', page: 'Speaking Your Truth', pageNum: 74 },
        heart: { title: 'The Heart', page: 'Grief & Letting Go', pageNum: 58 },
        gut: { title: 'The Gut', page: 'Self-Sabotage Integration', pageNum: 42 }
    };

    // Populate popups from CSV data
    async function loadBodyMapData() {
        try {
            const response = await fetch('shadow_workbook_pages_final.csv');
            const csvText = await response.text();
            const lines = csvText.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                const chapter = values[0].toLowerCase();
                const title = values[1];

                // Map CSV chapters to body parts
                if (chapter.includes('self-sabotage') || chapter.includes('phase 5')) {
                    bodyMappings.gut = { title: 'The Gut', page: title, pageNum: 'Phase 5' };
                } else if (chapter.includes('dark emotions') || chapter.includes('phase 6')) {
                    bodyMappings.heart = { title: 'The Heart', page: title, pageNum: 'Phase 6' };
                } else if (chapter.includes('golden shadow') || chapter.includes('phase 7')) {
                    bodyMappings.throat = { title: 'The Throat', page: title, pageNum: 'Phase 7' };
                }
            }

            // Update DOM
            const popupThroat = document.getElementById('popup-throat');
            const popupHeart = document.getElementById('popup-heart');
            const popupGut = document.getElementById('popup-gut');

            if (popupThroat) popupThroat.textContent = `${bodyMappings.throat.title}: ${bodyMappings.throat.page}`;
            if (popupHeart) popupHeart.textContent = `${bodyMappings.heart.title}: ${bodyMappings.heart.page}`;
            if (popupGut) popupGut.textContent = `${bodyMappings.gut.title}: ${bodyMappings.gut.page}`;

        } catch (error) {
            console.log('Using default body map data');
        }
    }

    loadBodyMapData();

    // --- Simple CSV parser that handles quoted fields ---
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    // --- Load CSV and populate Chapter Carousel with detailed cards ---
    async function loadChapters() {
        const carouselContainer = document.getElementById('chapter-carousel');
        if (!carouselContainer) return;

        try {
            const response = await fetch('shadow_workbook_pages_final.csv');
            const csvText = await response.text();

            const lines = csvText.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                const phase = values[0];
                const title = values[1];
                const description = values[2];

                const card = document.createElement('div');
                card.classList.add('chapter-card');
                card.innerHTML = `
          <span class="chapter-phase">${phase}</span>
          <h4>${title}</h4>
          <p>${description}</p>
        `;
                carouselContainer.appendChild(card);
            }
        } catch (error) {
            console.error('Error loading chapters:', error);
            carouselContainer.innerHTML = '<p>Could not load chapter preview.</p>';
        }
    }

    loadChapters();

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
