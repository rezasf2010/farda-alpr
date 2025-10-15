// eslint.config.js
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig([
  { ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'] },

  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, '@next/next': nextPlugin },
    settings: { react: { version: 'detect' } },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,

      // ✅ IMPORTANT: mark JSX identifiers as "used"
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // keep your unused vars policy
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },
]);
