const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './dist',
        port:9000,
        hot:true
    }
});