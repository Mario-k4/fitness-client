import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pkg from '@typescript-eslint/eslint-plugin'; // Use default import for CommonJS

const { eslintRecommended, rules } = pkg; // Access eslintRecommended and rules from the plugin

export default {
  parser: '@typescript-eslint/parser', // Use TypeScript parser

  extends: [
    js.configs.recommended, // Extend from ESLint's recommended rules
    eslintRecommended, // Add TypeScript ESLint plugin recommended rules (using `eslintRecommended` instead)
  ],

  files: ['**/*.{ts,tsx}'], // Only process TypeScript files

  languageOptions: {
    ecmaVersion: 2020, // Use ES2020 syntax
    globals: globals.browser, // Set globals to browser environment
  },

  plugins: {
    'react-hooks': reactHooks, // Add React Hooks plugin
    'react-refresh': reactRefresh, // Add React Refresh plugin
  },

  rules: {
    ...reactHooks.configs.recommended.rules, // Use recommended rules for React Hooks
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, // Allow constant exports in React Refresh
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never', // Don't require extensions for TypeScript files
      },
    ],
    'import/no-unresolved': 'off', // Disable unresolved import errors
    'no-undef': 'off', // Disable the no-undef rule which is unnecessary for TypeScript
  },

  ignores: ['dist', 'node_modules'], // Ignore dist and node_modules directories
};
