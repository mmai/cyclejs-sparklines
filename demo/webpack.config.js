var path = require('path');
var webpack = require('webpack')

module.exports = {
  // cache: false,
    entry: './demo.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'demo.build.js',
    },
    module: {
        loaders: [{ test: /\.jsx?$/, exclude: /(node_modules)/, loader: 'babel-loader' }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: []
};
