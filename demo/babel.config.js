module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@react-native-grid2/core': '../packages/grid2/src',
          },
        },
      ],
    ],
  };
};
