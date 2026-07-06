import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // ponytail: '/portfolio/' assumes the GitHub repo is named "portfolio"
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',
  plugins: [vue(), tailwindcss()],
})
