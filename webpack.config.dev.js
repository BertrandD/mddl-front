var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './assets/',
    './scss/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "http://localhost:3000/dist/",
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          "presets": ["es2015", "react", "react-hmre"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./scss")]
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
