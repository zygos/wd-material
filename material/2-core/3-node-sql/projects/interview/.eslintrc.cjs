/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/extensions': 'off',
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/semi': ['error', 'never', { beforeStatementContinuationChars: 'always' }],
  },
}
