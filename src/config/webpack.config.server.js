var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

console.log(path);
console.log('Building for environment: ' + process.env.NODE_ENV);

module.exports = {
  devtool: 'eval',
  entry: [
    './src/server/server'
  ],
  output: {
    path: './dist/server/',
    filename: 'server.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
        allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
        {
            test: require.resolve('react'),
            loader: 'expose?React'
        },
        {
            test: /\.js?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=image/svg+xml'
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }
    ]
  }
}
