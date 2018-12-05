const path = require('path');
const webpack = require('webpack');

// Plugins para otimizar o JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Plugins para otimizar o SASS e o CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Plugins para otimizar imagens
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// Plugins para gerar Favicons
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// Plugins de Manutenção
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            new CleanWebpackPlugin(['assets']),
            new CopyWebpackPlugin([{
                    from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
                    to: 'fonts'
                }, {
                    from: 'src/img',
                    to: 'img'
                },
                {
                    from: 'src/svg',
                    to: 'svg'
                },
                {
                    from: 'src/video',
                    to: 'video'
                },
            ]),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
            new FaviconsWebpackPlugin({
                // The favicon app title (see https://github.com/haydenbleasel/favicons#usage)
                // title: 'Webpack App',

                // Your source logo
                logo: './src/favicon/favicon.png',
                // The prefix for all image files (might be a folder or a name)
                prefix: 'favicon/favicon[hash]',
                // Emit all stats of the generated icons
                emitStats: false,
                // The name of the json containing all favicon information
                statsFilename: 'faviconstats[hash].json',
                // Generate a cache file with control hashes and
                // don't rebuild the favicons until those hashes change
                persistentCache: true,
                // Inject the html into the html-webpack-plugin
                inject: true,
                // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
                background: '#fff',

                // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: true,
                    favicons: true,
                    firefox: true,
                    opengraph: true,
                    twitter: true,
                    yandex: true,
                    windows: true
                }
            }),
            new HtmlWebpackPlugin({
                hash: true,
                template: './src/favicon/favicon.html',
                filename: './favicon/favicon-build.html',
                inject: true,
                minify: {
                    removeComments: !devMode,
                    collapseWhitespace: !devMode
                }
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new webpack.ProvidePlugin({
                /* Use when importing individual BS components */
                '$': 'jquery/dist/jquery',
                'jQuery': 'jquery/dist/jquery',
                //'Popper': 'popper.js/dist/umd/popper', /* required for tooltips */
                //'Util': 'exports-loader?Util!bootstrap/js/dist/util'
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
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                },
                {
                    test: /\.(svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'svg/'
                        }
                    }
                },
                {
                    test: /\.(mp4|avi|mpg|webp)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'video/'
                        }
                    }
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