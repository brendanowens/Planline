const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './frontend/src/css/custom_antd_theme.less'), 'utf8'));

module.exports = {
    entry: {
        app: './frontend/src/index.js'
    },
    watch: false,
    devtool: 'source-map',
    output: {
        filename: '[name]-[hash].bundle.js',
        path: path.resolve(__dirname, 'frontend/static/frontend')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react'],
                            plugins: [
                                ['import', {libraryName: "antd", style: true}]
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react'],
                            plugins: [
                                ['import', {libraryName: "antd", style: true}]
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: themeVariables
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new CleanWebpackPlugin(),
    ]
};