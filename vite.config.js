import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // ponytail: base must match the GitHub repo name
  base: process.env.GITHUB_ACTIONS ? '/vue-portfolio/' : '/',
  plugins: [vue(), tailwindcss()],
})
