/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb', // or any other config you want to extend
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // we can override some problematic import rules here
    // that can cause issues when using import aliases.
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // functions are always hoisted, so we can use them before they are defined
    // which in various cases improves readability
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
  },
}
