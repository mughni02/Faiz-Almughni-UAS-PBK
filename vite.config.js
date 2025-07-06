import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // Menambahkan konfigurasi untuk Vitest di sini.
  // Triple-slash directive di bawah ini membantu editor kode (seperti VSCode)
  // untuk memberikan auto-completion dan type-checking pada objek 'test'.
  /// <reference types="vitest" />
  test: {
    // 'globals: true' memungkinkan kita untuk menggunakan API Vitest (seperti 'describe', 'it', 'expect')
    // di semua file tes tanpa perlu mengimpornya secara manual.
    globals: true,
    
    // 'environment: 'jsdom'' sangat penting untuk testing komponen Vue.
    // Ini mensimulasikan lingkungan browser (DOM) sehingga kita bisa me-mount komponen
    // dan berinteraksi dengannya seolah-olah berjalan di browser sungguhan.
    environment: 'jsdom',
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
