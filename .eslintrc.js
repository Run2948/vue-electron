module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "semi": ["off", "always"],
    "quotes": ["off", "double"],
    "camelcase": ["off", "always"],
    "comma-dangle": ["off", "always"],
    "space-before-function-paren": 0,
    'eol-last': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
