module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import', 'vue'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-plusplus': 'off',
    'func-names': 'off',
    'max-len': 'off',
    // vue eslint rules
    // https://eslint.vuejs.org/rules/script-indent.html
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    // import eslint rules
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/tests/server/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      // https://github.com/benmosher/eslint-plugin-import/issues/1396
      [require.resolve('eslint-import-resolver-node')]: {},
    },
  },
  globals: {
    defineProps: 'readonly',
  },
};
