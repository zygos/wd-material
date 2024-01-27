/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const { globals } = require('./.eslintrc-auto-import.json')

module.exports = {
  root: true,
  globals,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-use-before-define': ['error', { 'functions': false }],
    'vue/multi-word-component-names': ['error', {
      'ignores': ['index'],
    }],
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@stores', './src/stores'],
        ],
      },
    },
  },
}
