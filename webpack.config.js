const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        bg: './src/bg/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget: 'var',
        // `library` determines the name of the global variable
        library: '[name]'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyPlugin([
            {
                from: 'src/icon.*',
                flatten: true
            },
            {
                from: 'src/config.xml',
                flatten: true
            },
            {
                from: 'src/mockups/*',
                to: 'mockups/',
                flatten: true
            },
            {
                from: 'src/images/*',
                to: 'images/',
                flatten: true
            },
            {
                from: 'src/templates/*',
                to: 'templates/',
                flatten: true
            }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['index', 'vendors~index']
        }),
        new HtmlWebpackPlugin({
            template: 'src/bg/index.html',
            filename: 'bg/index.html',
            inject: 'body',
            chunks: ['bg']
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            path: __dirname + '/dist'
        }),
        new ZipPlugin({
            path: __dirname + '/package',
            filename: 'homescreen',
            extension: 'wgt',
            exclude: []
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}; 
