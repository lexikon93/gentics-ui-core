// Karma configuration
// Generated on Thu Dec 03 2015 13:23:31 GMT+0100 (W. Europe Standard Time)
const path = require('path');
const paths = require('./build.config.js').paths;
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'testing-bootstrap.js',
            { pattern: paths.src.typescript[0], watched: false, served: false, included: false }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'testing-bootstrap.js': ['webpack', 'sourcemap']
        },

        webpack: {
            // webpack configuration
            resolve: {
                extensions: ['.js', '.ts'],
                modules: ['node_modules', 'src']
            },
            module: {
                loaders: [
                    {
                        test: /\.ts/,
                        loaders: [
                            'awesome-typescript-loader?transpileOnly=true&configFileName=config/tsconfig.tests.json',
                            'angular2-template-loader'
                        ]
                    },
                    { test: /\.html/, loader: 'html-loader' },
                    { test: /\.json/, loader: 'json-loader' }
                ]
            },
            plugins: [
                new webpack.LoaderOptionsPlugin({
                    options: {
                        context: __dirname,
                        ts: {
                            //
                            files: ['testing-bootstrap.ts']
                        },
                        // work around: https://github.com/TypeStrong/ts-loader/issues/283#issuecomment-249414784
                        resolve: {}
                    }
                }),
                // work-around for https://github.com/angular/angular/issues/11580
                new webpack.ContextReplacementPlugin(
                    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                    __dirname
                ),
                new CheckerPlugin()
            ],
            devtool: 'inline-source-map'
        },

        webpackMiddleware: {
            stats: { chunks: false }
        },
        plugins: [
            require('karma-webpack'),
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-mocha-reporter',
            'karma-sourcemap-loader'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
