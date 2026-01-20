import { injectSchema } from './schema.js';

// Inject JSON-LD Schema for SEO
injectSchema();

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================
       Image Slider Logic
       =========================== */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Reset all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activate new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto Advance (Optional, slow)
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 8000);


    /* ===========================
       Modal Logic
       =========================== */
    const modal = document.getElementById('contract-modal');
    const openBtn = document.getElementById('preview-contract-btn');
    const closeBtn = document.querySelector('.close-modal');

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300); // Wait for transition
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });

});
