module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
}
