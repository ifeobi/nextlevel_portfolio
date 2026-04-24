import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { ifexApiPlugin } from './scripts/vite-plugin-ifex-api'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files and surface Ifex API secrets to process.env so the
  // dev-only Ifex plugin can invoke the handlers locally.
  const env = loadEnv(mode, process.cwd(), '');
  if (env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  if (env.DATABASE_URL) process.env.DATABASE_URL = env.DATABASE_URL;

  return {
    plugins: [react(), ifexApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            'vendor-mediapipe': ['@mediapipe/tasks-vision'],
          },
        },
      },
    },
  }
})
