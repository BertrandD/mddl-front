var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var tag = require('child_process').execSync('git describe --abbrev=0 --tags').toString().trim()
var version = tag+'.'+require('child_process').execSync('git rev-list '+tag+'..HEAD --count').toString().trim();
console.log("Building version : "+version)
version = "\"" + version + "\""

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
        modules: [
            path.resolve('./core'),
            "node_modules"
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react',
                            'react-hmre',
                            'stage-2'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader?sourceMap"
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer
                                ];
                            }
                        }
                    }, {
                        loader: "sass-loader?sourceMap",
                        options: {
                            includePaths: [path.resolve(__dirname, "./scss")]
                        }
                    }]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{loader: "url-loader?limit=10000&mimetype=application/font-woff"}]
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{loader: "file-loader"}]},
            {test: /\.jpg$/, use: [{loader: "url-loader?limit=10000&minetype=image/jpg"}]},
            {test: /\.png$/, use: [{loader: "url-loader?limit=10000&minetype=image/png"}]}
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.min.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'AI': false,
            'VERSION': version
        })
    ]
};
