var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
  entry: [
    './assets',
    './scss/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react',
            'stage-2'
          ]
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        argv.p
          ? '"production"'
          : '"development"'
    })
  ]
};
