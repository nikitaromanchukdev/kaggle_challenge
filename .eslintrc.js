module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  plugins: [
    '@babel',
    'react',
    'import',
    'react-hooks',
    'jsx-a11y',
  ],


  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: [
          'src',
        ],
        extensions: [ '.js', '.jsx' ],
      },
    },
  },

  rules: {
    'eol-last': [
      'error',
      'always',
    ],
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'import/prefer-default-export': 0,
    'react/jsx-indent': [
      'error',
      2,
    ],
    'react/jsx-indent-props': [
      'error',
      2,
    ],
    'react/jsx-props-no-spreading': [
      1,
      {
        custom: 'ignore',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'react/jsx-fragments': [ 2, 'element' ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
