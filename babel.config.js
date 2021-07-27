module.exports = {
  presets: [ '@babel/preset-react' ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: [ './src' ],
        alias: {
          '/': './',
          '@/': './',
        },
        stripExtensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
  ],
};

