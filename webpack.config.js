const path = require('path')
const webpack = require('webpack')

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.join(ROOT_PATH, 'src')

module.exports = {
  // Webpack entry point.
  entry: path.join(SRC_PATH, 'index.js'),

  // Output definition.
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: 'index.js',
  },

  // Define loaders for webpack transpilation.
  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', include: SRC_PATH},
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include: SRC_PATH},
    ],
  },

  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
  ],

  stats: {
    // Nice colored output
    colors: true,
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map',
}
