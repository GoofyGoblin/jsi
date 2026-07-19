import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  output: {
    codeSplitting: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        texteditor2: resolve(__dirname, 'texteditor2.html'),
        tilingwm2: resolve(__dirname, 'tilingwm2.html'),
      }
    }
  }
})
