// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'no-multiple-empty-lines': 'warn',
    'quotes': [1,'single'],
    'comma-dangle': [1,'never'],
    'no-cond-assign': [1,'always'],
    'no-console': 1,
    'no-constant-condition': 1,
    'no-control-regex': 1,
    'no-dupe-args': 1,
    'no-dupe-keys': 1,
    'no-duplicate-case': 1,
    'no-empty-character-class': 1,
    'no-empty': 1,
    'no-ex-assign': 1,
    'no-extra-boolean-cast': 1,
    'no-extra-semi': 1,
    'no-func-assign': 1,
    'no-inner-declarations': [1,'functions'],
    'no-invalid-regexp': 1,
    'no-irregular-whitespace': 1,
    'no-negated-in-lhs': 1,
    'no-obj-calls': 1,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 1,
    'use-isnan': 1,
    'eqeqeq': [1,'smart'],
    'no-fallthrough': 1,
    'no-delete-var': 1,
    'semi': [1,'always']
  }
};
