module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier', 'vue']
}
