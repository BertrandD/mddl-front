var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('app.min.css');

module.exports = {
  entry: [
    './assets',
    './scss/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'app.min.js'
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
        loader:  extractCSS.extract(["css", "postcss", "sass"])
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.jpg$/,    loader: "url-loader?limit=10000&minetype=image/jpg" }
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./scss")]
    }
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        argv.p
          ? '"production"'
          : '"development"'
    }),
    extractCSS
  ]
};
