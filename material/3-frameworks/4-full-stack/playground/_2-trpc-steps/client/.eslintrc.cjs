/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/no-relative-parent-imports': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            // using gitignore syntax
            group: [
              // forbidden
              '@server/*',
              '@mono/server/src/database',
              '@mono/server/src/middleware',
              '@mono/server/src/modules',
              '@mono/server/src/trpc',
              '@mono/server/src/utils',
              '@mono/server/src/app',
              '@mono/server/src/config',
            ],
            message: 'Please only import from @mono/server/src/shared.',
          },
        ],
      },
    ]
  },
}
