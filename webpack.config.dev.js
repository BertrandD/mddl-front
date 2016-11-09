var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './assets/',
    './scss/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "http://127.0.0.1:3000/dist/",
    filename: 'bundle.js'
  },
  resolve: {
    root: [
      path.resolve('./core')
    ]
  },
  devtool: 'source-map',
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
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.jpg$/,    loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png$/,    loader: "url-loader?limit=10000&minetype=image/png" }
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./scss")]
    }
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
