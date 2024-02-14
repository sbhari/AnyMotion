module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.ts',
          '.android.tsx',
          '.ios.ts',
          '.ios.tsx',
          '.json',
          '.svg'
        ],
        alias: {
          '@assets': './src/assets/svgs/index',
        },
      },
    ],
    'react-native-reanimated/plugin'],
};
