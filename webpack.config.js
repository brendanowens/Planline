const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true,
                        modifyVars: themeVariables
                    }
                }]
            },
        ]
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new CleanWebpackPlugin(),
    ]
};