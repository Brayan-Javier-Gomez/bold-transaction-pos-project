import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',

    setupFiles: ['./vitest.setup.ts'],

    include: [
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],

    exclude: [
      'node_modules',
      'dist',
      '.next',
      'build',
      'coverage'
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        '.next/',
        'dist/',
        'build/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/types/**',
        '**/__tests__/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'vitest.setup.ts',
        'next.config.ts',
        'eslint.config.mjs',
        'fonts/**',
        'public/**',
        'styles/**',
        'app/**/layout.tsx',
      ],


      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    },


    globals: true,

    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },


    testTimeout: 10000,

    reporters: ['verbose']
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/components': resolve(__dirname, './components'),
      '@/features': resolve(__dirname, './features'),
      '@/lib': resolve(__dirname, './lib'),
      '@/styles': resolve(__dirname, './styles'),
      '@/app': resolve(__dirname, './app')
    }
  }
})
