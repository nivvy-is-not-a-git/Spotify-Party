import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// the port: 5173 is harcoded so that it stayson port 5173 as that is the port that we connect the flask to
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1', //switched from localhost to 127.0.0.1 because vite doesnt have 127.0.0.1 running automatically and only has local host fixed
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
