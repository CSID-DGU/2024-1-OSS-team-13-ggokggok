import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  console.log('Environment Variables:', env);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/v1': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/v1/, '/v1')
        }
      }
    }
  };
});
