module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  plugins: ['react'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']]
      }
    }
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
