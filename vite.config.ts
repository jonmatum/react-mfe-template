import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactMFETemplate',
      fileName: format => `react-mfe-template.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@heroicons/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@heroicons/react': 'HeroiconsReact',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  preview: {
    port: 3000,
    host: true,
    cors: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  },
});
