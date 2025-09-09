import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],

  // Настройки для HTML entry point
  root: '.',
  publicDir: 'public',

  // Настройки разрешения модулей
  resolve: {
    alias: {
      // Алиас для shared пакета (аналог tsconfig-paths-webpack-plugin)
      '@shared': resolve(__dirname, '../../packages/shared/src'),
      // Алиас для src (аналог webpack resolve.alias)
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  // Настройки CSS
  css: {
    modules: {
      // Настройки CSS Modules (аналог css-loader modules)
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },

  // Настройки сборки
  build: {
    // Извлечение CSS в отдельные файлы (аналог MiniCssExtractPlugin)
    cssCodeSplit: false,
    // Source maps для production
    sourcemap: true,
    // Настройки выходных файлов
    outDir: 'dist',
    assetsDir: 'assets',
    // Оптимизация
    minify: 'terser',
    rollupOptions: {
      output: {
        // Именование файлов
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name].[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return `images/[name].[hash].${ext}`;
          }
          return `assets/[name].[hash].${ext}`;
        },
      },
    },
  },

  // Настройки dev-сервера
  server: {
    port: 3000,
    open: true,
    // Hot Module Replacement
    hmr: true,
    // CORS для API запросов
    cors: true,
  },

  // Настройки preview (для тестирования production сборки)
  preview: {
    port: 3000,
    open: true,
  },

  // Настройки оптимизации зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'classnames'],
  },

  // Настройки для статических файлов
  assetsInclude: [
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.woff',
    '**/*.woff2',
  ],
});
