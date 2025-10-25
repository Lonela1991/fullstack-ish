import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    ignores: ['node_modules', './dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { process: 'readonly', console: 'readonly' },
    },
    extends: [js.configs.recommended],
    rules: {
      'no-unused-vars': 'warn',
      semi: ['error', 'always'],
    },
  },
]);
