import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://velvety-426i.vercel.app',//http://localhost:5000 thay cái này nào khi anh em làm để thấy kết quả trực tiếp trên local
        changeOrigin: true, // làm xong local để lại https://velvety-426i.vercel.app này rồi mới commit
        secure: false,
      }, // Proxy all requests starting with "/api" to the backend
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
