module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Temporarily disabling Reanimated plugin
      /*
      [
        'react-native-reanimated/plugin',
        {
          relativeSourceLocation: true,
        }
      ]
      */
    ],
  };
};
