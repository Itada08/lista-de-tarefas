import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // O navegador chama /tasks na porta do Vite e o Vite repassa para o backend.
    // Assim não precisa de CORS e o backend fica intacto.
    proxy: { '/tasks': 'http://localhost:3000' },
  },
})
