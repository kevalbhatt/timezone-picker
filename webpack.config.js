/**
 * @version: 1.0.2
 * @author: Keval Bhatt 
 * @copyright: Copyright (c) 2015 Keval Bhatt. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://kevalbhatt.github.io/timezone-picker/
 */

const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require("Html-webpack-plugin"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractApp = new ExtractTextPlugin('styles/[name].css');
const extractVendor = new ExtractTextPlugin('styles/[name]-vendor.css');

var ENV = process.env.NODE_ENV,
    buildType = process.env.BUILD_TYPE,
    isProd = (
        ENV === "production" ?
        true :
        false),
    BUILD_DIR = path.resolve(
        __dirname, 'dist'),
    ROOT_DIR = path.resolve(__dirname),
    APP_DIR = path.resolve(__dirname, 'src'),
    NODE_MODULES = path.resolve(__dirname, 'node_modules'),
    pathsToClean = [BUILD_DIR],
    config = {
        entry: {
            "timezone-picker-vendor": ['moment-timezone', 'jquery', 'select2'],
            "timezone-picker": APP_DIR + "/TimezonePicker.js",
        },
        output: {
            path: (
                isProd ?
                BUILD_DIR :
                ROOT_DIR), //<- This path is use at build time
            filename: "[name].min.js", //<- This file is created under path which we specified in output.path
            chunkFilename: '[name].min.js',
            libraryTarget: 'umd'
        },
        plugins: [
            new CleanWebpackPlugin(pathsToClean, {
                root: ROOT_DIR,
                verbose: true
            }),
            extractApp,
            extractVendor,
            new HtmlWebpackPlugin({
                title: 'timezone-picker',
                template: (APP_DIR) + '/index.ejs',
                chunks: ['vendor', 'timezone-picker'],
                filename: (
                    isProd ?
                    ROOT_DIR + "/example" :
                    ROOT_DIR) + '/index.html'
            }),
            new webpack.DefinePlugin({ 'isProd': isProd }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                moment: "moment-timezone",
                select2: 'select2'
            })
        ],
        resolve: {
            modules: [
                APP_DIR, NODE_MODULES
            ],
            extensions: [
                '.js',
                '.jsx',
                '.html',
                '.css',
                '.scss'
            ]
        },
        module: {
            rules: [{
                    test: /\.jsx($|\?)|\.js($|\?)/,
                    exclude: /node_modules/,
                    include: [
                        APP_DIR, ROOT_DIR
                    ],
                    use: [{
                        loader: "babel-loader",
                        query: {
                            presets: [
                                "env"
                            ],
                            plugins: ["transform-decorators-legacy", "transform-flow-strip-types", "transform-class-properties", "transform-object-rest-spread", "add-module-exports"]
                        }
                    }]
                }, {
                    test: /\.css$/,
                    use: extractVendor.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                minimize: isProd,
                                includePaths: [
                                    NODE_MODULES
                                ]
                            }
                        }]
                    })

                },
                {
                    test: /\.scss$/,
                    use: extractApp.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                minimize: isProd
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    APP_DIR + "/styles"
                                ]
                            }
                        }]
                    })
                },
                {
                    test: require.resolve('select2'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'select2'
                    }]
                },
                {
                    test: require.resolve('moment'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'moment'
                    }]
                },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ]
        },
        devServer: {
            port: 9099,
            host: "0.0.0.0",
            disableHostCheck: true
        }
    };

if (!isProd) {
    config['devtool'] = 'inline-source-map';
    config['cache'] = true;
}
module.exports = config;