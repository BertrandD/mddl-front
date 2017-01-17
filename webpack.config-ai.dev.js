var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  entry: [
    './ai/',
    'whatwg-fetch'
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'ai.js'
  },
  node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
  },
  externals: nodeModules,
  resolve: {
    root: [
      path.resolve('./core')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          "presets": ["es2015", "react", "react-hmre", 'stage-2']
        }
      },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.BannerPlugin('require("source-map-support").install();',
          { raw: true, entryOnly: false }),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'AI': true
      })
  ]
};
