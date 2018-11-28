const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './rent'),
        publicPath: '/ipns/QmaL35BGUi95TSYXZDJbmZzHpSxPVx8ASCrg5h4acw1TjU/'//根据服务器的文件夹定义访问路径
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});