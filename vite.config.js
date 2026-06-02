import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> relatieve asset-paden, zodat de site werkt op een
// GitHub Pages project-URL (https://gebruiker.github.io/repo-naam/)
// ongeacht de repo-naam.
export default defineConfig({
  base: './',
  plugins: [react()],
})
