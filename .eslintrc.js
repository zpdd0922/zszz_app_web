/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:16
 * @LastEditors: Jim
 * @LastEditTime: 2019-03-20 10:20:16
 * @Description: 
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  extends: 'standard',
  // add your custom rules here
  rules: {
    "strict": 0,
    "no-console": 0,
    "global-require": 0,
    "prefer-destructuring": ["error", {
      "object": false,
      "array": false
    }],
    "max-len": ["error", 120],
    "object-curly-newline": 0,
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-new": 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'block-spacing': ["error", "never"],
    'space-before-blocks': ["error", "always"],
    'space-before-function-paren': ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error", {
      "int32Hint": false
    }],
    'no-tabs': 'off',
    'semi': ["error", "always"],
    'comma-dangle': ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "ignore"
    }],
    "array-bracket-newline": ["error", {
      "multiline": true,
      "minItems": 2
    }]
  }
}