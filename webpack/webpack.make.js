'use strict';

/*eslint-env node*/
var PATHS = require('./webpack.paths.js');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// var CleanWebpackPlugin = require('clean-webpack-plugin');
// var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
// var WebpackChunkHash = require("webpack-chunk-hash");


module.exports = function makeWebpackConfig(options) {
    
    /**
     * Environment type
     * BUILD is for generating minified builds
     * TEST is for generating test builds
     */
    var BUILD = !!options.BUILD;
    var TEST = !!options.TEST;
    var DEV = !!options.DEV;

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Entry
     */
    if(TEST) {
        config.entry = function(){return {}};
    } else {
        config.entry = {
            app: PATHS.APP,
            polyfills: PATHS.POLYFILLS,
            vendor: PATHS.VENDORS
        }
    }

    /**
     * Output
     */
    if(TEST) {
        config.output = function(){return {}};
    } else {
        config.output = {
            // Absolute output directory
            path: BUILD ? PATHS.BUILD_CLIENT : PATHS.TMP,

            // Output path from the view of the page
            // Uses webpack-dev-server in development
            publicPath: BUILD || DEV ? '/' : `http://localhost:${8080}/`,
            //publicPath: BUILD ? '/' : 'http://localhost:' + env.port + '/',

            // Filename for entry points
            // Only adds hash in build mode
            filename: BUILD ? '[name].[chunkhash].js' : '[name].bundle.js',

            // Filename for non-entry points
            // Only adds hash in build mode
            chunkFilename: BUILD ? '[name].[chunkhash].js' : '[name].bundle.js'
        };
    }

    config.resolve = {};

    /**
     * Devtool
     */
    if(TEST) {
        config.devtool = 'inline-source-map';
    } else if(DEV) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'cheap-module-source-map';
    }

    /**
     * Loaders
     */
    // Initialize module
    config.module = {

        rules: [{
            test: /\.js$/,
            enforce: "pre",
            exclude: /node_modules/,
            use: ['jshint-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)([\?]?.*)$/,
            use: ['file-loader']
        }, {
            test: /\.html$/,
            use: ['raw-loader']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap'
            })
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader'
            ],
            include: [
                path.resolve(PATHS.NODE_MODULES, '/materialize-css/sass/*.scss'),
                PATHS.SASS
            ]
        }]
    };

 

    
    /*if(TEST) {
        config.module.preLoaders.push({
            //delays coverage til after tests are run, fixing transpiled source coverage error
            test: /\.js$/,
            exclude: /(node_modules|spec\.js|mock\.js)/,
            loader: 'isparta-instrumenter',
            query: {
                babel: {
                    // optional: ['runtime', 'es7.classProperties', 'es7.decorators']
                }
            }
        });
    }
*/
    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
   /* config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];*/

    /**
     * Plugins
     */
    config.plugins = [

        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            disable: !BUILD || TEST
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            "window.jquery": "jquery",
            Hammer: "hammerjs/hammer"
        }),

        new HtmlWebpackPlugin({
            template: PATHS.INDEX_HTML,
            filename: 'index.html',
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackHarddiskPlugin(),

        // Define free global variables
        new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: BUILD ? JSON.stringify("production") : ( TEST ? JSON.stringify("test") : JSON.stringify("development") )
                }
            })
    
    ];


    if(!TEST) {
        config.plugins.push(
            new CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                minChunks: Infinity
            }));
    }

    // Add build specific plugins
    if(BUILD) {
        config.plugins.push(

            // Only emit files when there are no errors
            new webpack.NoEmitOnErrorsPlugin(),

            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            })

        );
    }

    config.cache = DEV;

    if(TEST) {
        config.stats = {
            colors: true,
            reasons: true
        };
        config.debug = false;

    }

    /**
     * Dev server configuration
     */
    config.devServer = {
        contentBase: '/',
        historyApiFallback: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    };

    return config;
};
