import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],

    // Incluir tests co-located y centralizados
    include: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '__tests__/**/*.{test,spec}.{ts,tsx}'
    ],

    // Excluir node_modules y builds
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'coverage'
    ],

    // Configuración de coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],

      // Archivos a incluir en el coverage
      include: [
        'features/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}'
      ],

      // Excluir del coverage
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/*.d.ts',
        '**/types/**',
        '**/*.module.scss',
        '__tests__/**',
        'next.config.ts',
        'next-env.d.ts',
        'fonts/**'
      ],

      // Umbrales de coverage mínimo
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 70,
        statements: 75
      }
    }
  },

  // Alias de rutas (igual que en tsconfig.json)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})
