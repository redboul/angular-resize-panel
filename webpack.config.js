const path = require('path');
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: './index',

    output: {
        path: path.resolve('./bundles'),
        publicPath: '/',
        filename: 'index.umd.js',
        libraryTarget: 'umd',
        library: 'angular-resize-pane'
    },

    // require those dependencies but don't bundle them
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: ['node_modules']
        }, {
            test: /\.css$/,
            loader: 'raw-loader!css-loader'
        }, {
            test: /component\.html$/,
            loader: 'html-loader?-attrs&root=' + __dirname + '/src'
        }, {
            test: /\.ts$/,
            loader: [
                'awesome-typescript-loader?declaration=false',
                'angular2-template-loader'
            ]
        },{
            test: /\.js$/,
            loaders: ['babel-loader?cacheDirectory&presets[]=es2015&presets[]=es2017&presets[]=es2016' , 'eslint-loader' ],
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        })
    ]
};