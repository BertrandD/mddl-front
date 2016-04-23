var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
  entry: [
    './assets'
  ],
  output: {
    path: path.join(__dirname, 'src/Wizbii/AdManagerBundle/Resources/public'),
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
      }
    ]
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
