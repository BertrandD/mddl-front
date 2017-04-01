var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './assets',
        './scss/index'
    ],
    output: {
        path: path.join(__dirname, 'nwjs/dist'),
        publicPath: "/dist/",
        filename: 'app.min.js'
    },
    resolve: {
        modules: [
            path.join(__dirname, "core"),
            "node_modules"
        ],
    },
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
                            'stage-2'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
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
                        loader: "sass-loader",
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
        new webpack.DefinePlugin({
            'AI': false,
            'process.env.NODE_ENV': argv.p
                ? '"production"'
                : '"development"'
        })
    ]
};
