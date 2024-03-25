/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  env: {
    'vitest-globals/env': true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // TypeScript does a better job for import checks than ESLint
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': ['error', { 'functions': false }],
  },
}
