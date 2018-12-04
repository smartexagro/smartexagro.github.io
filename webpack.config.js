const path = require('path');
const webpack = require('webpack');

// Plugins para otimizar o JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Plugins para otimizar o SASS e o CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Plugins de Manutenção
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    return {
        entry: {
            main: './src/js/main.js'
        },
        output: {
            filename: 'js/[name].js',
            path: path.join(__dirname, '/assets')
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: devMode
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        plugins: [
            //new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([{
                from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
                to: 'fonts'
            }, ]),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new webpack.ProvidePlugin({
                /* Use when importing individual BS components */
                '$': 'jquery/dist/jquery.slim.js',
                'jQuery': 'jquery/dist/jquery.slim.js',
                'Popper': 'popper.js/dist/umd/popper', /* required for tooltips */
                'Util': 'exports-loader?Util!bootstrap/js/dist/util'
            }),
            new WriteFilePlugin(),
            new CompressionPlugin()
        ],
        module: {
            rules: [{
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader?url=false', // translates CSS into CommonJS modules
                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'sass-loader' // compiles Sass to CSS
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                }
            ]
        }
    };
};