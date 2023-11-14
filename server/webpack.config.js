const path = require('path')
// const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    frontend: './frontend/src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'frontend/static/frontend/'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleTracker({
    //   path: __dirname,
    //   filename: 'webpack-stats.json', // Remove the "./" from the filename
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
