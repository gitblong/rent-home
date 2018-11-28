const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'//根据服务器的文件夹定义访问路径
    },
    devServer: {
        contentBase: './dist',
        port:9000,
        host:'0.0.0.0',
        hot:true
    }
});