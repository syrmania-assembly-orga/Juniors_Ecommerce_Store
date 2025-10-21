import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      configPrettier,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], //Enforces consistent array type
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        { 'ts-expect-error': 'allow-with-description' },
      ], //Controls or bans @ts-ignore and @ts-expect-error comments.
      '@typescript-eslint/no-floating-promises': 'error', //Prevents promises from being used without await or proper handling.
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ], //enforces using  arrow function for React component
      'react-hooks/rules-of-hooks': 'error', //Enforces the rules of hooks
      'react-hooks/exhaustive-deps': 'warn', //Warns if dependencies in useEffect are missing.
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      curly: ['error', 'all'],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
