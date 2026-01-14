import { defineConfig } from 'vite'

export default defineConfig({
    base: './', // Ensures relative paths for static deployment
    build: {
        outDir: 'out' // Output folder for Hostinger/Next.js static export compatibility
    }
})
