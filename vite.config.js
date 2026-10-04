import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// When deploying on Vercel, the app is served at the root domain ('/').
// When deploying on GitHub Pages, the app is served under the repo subpath ('/cec-heist/').
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_ENV);
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const base = process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGitHubPages ? '/cec-heist/' : '/'));

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true
  }
});
