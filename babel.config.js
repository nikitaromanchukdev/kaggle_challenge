module.exports = {
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
          '.vue',
        ],
      },
    ],
  ],
};

