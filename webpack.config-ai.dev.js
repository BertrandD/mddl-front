var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var webpackSourceMapSupport = require("webpack-source-map-support");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
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
        filename: 'ai.js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
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
        modules: [
            path.resolve('./core'),
            "node_modules"
        ]
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
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpackSourceMapSupport(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'AI': true
        })
    ]
};
