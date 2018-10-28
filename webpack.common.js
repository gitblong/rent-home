const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
var babelpolyfill = require("babel-polyfill");
// var publicPath = ip + name
HappyPack = require('happypack'),
    os = require('os'),
    happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './rent'),
        publicPath: '/ipns/QmaL35BGUi95TSYXZDJbmZzHpSxPVx8ASCrg5h4acw1TjU/'//根据服务器的文件夹定义访问路径
    },
    plugins: [
        new CleanWebpackPlugin(['rent']),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //多线程的方式打包
        new HappyPack({
            id: 'js',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }),
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
                test:/\.scss$/,
                loaders:'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                //babel预加载react ,js,jsx
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader:'HappyPack/loader?id=js',
                // use: [
                //     {
                //         loader: 'babel-loader',
                //     }
                // ],
            }
        ]
    }
};