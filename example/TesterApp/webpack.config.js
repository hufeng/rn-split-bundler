const path = require('path');

module.exports = {
  entry: './smart-app.js',
  output: {
    filename: 'bundle-[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
            plugins: [
              [
                'babel-plugin-rn-manifest-dll',
                {
                  manifeshFilePath: './manifest.json',
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
