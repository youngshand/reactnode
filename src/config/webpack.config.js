/*eslint-disable no-unused-vars*/
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import Promise from 'es6-promise';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

require('es6-promise').polyfill();

const WEBPACK_DEV_PORT = process.env.WEBPACK_DEV_PORT || 8080;
const ENV = process.env.NODE_ENV || 'local';
const BUILD = (ENV === 'staging' || ENV === 'production');
const persistentPlugins = [
  new ForceCaseSensitivityPlugin(),
  new webpack.NoErrorsPlugin()
];

console.log('WEBPACK: Building for environment: ' + ENV);

module.exports = {
  devtool: BUILD ? 'cheap-module-source-map' : 'source-map',

  entry: BUILD ? {
    app: [
      './src/client/entry',
      './scss/main.scss'
    ],
    vendor: ['react', 'react-dom', 'react-router', 'react-helmet', 'react-redux']
  } : [
    `webpack-dev-server/client?http://localhost:${WEBPACK_DEV_PORT}`,
    'webpack/hot/only-dev-server',
    './src/client/entry',
    './scss/main.scss'
  ],
  output: BUILD ? {
    path: __dirname + '/../../dist',
    filename: 'js/app.js'
  } : {
    path: '/js',
    filename: 'app.js',
    publicPath: 'http://localhost:' + WEBPACK_DEV_PORT + '/js/'
  },
  plugins: //(BUILD) ? (if ? this : that) : that
    BUILD ?
      [ // production plugins
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin('init.js'),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false
        }),
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        })
      ] : [
        // local plugins
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:' + WEBPACK_DEV_PORT
          },{
            reload: false
          }
        )
      ],
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'handlebars': 'handlebars/runtime.js'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['jshint'],
        include: './src'
      }
    ],
    loaders: [
        {
          test: require.resolve('react'),
          loader: 'expose?React'
        },
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          include: /\.json$/, loaders: ['json-loader']
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url',
          query: {
            limit: 1,
            minetype: 'application/font-woff'
          }
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url',
          query: {
            limit: 1,
            minetype: 'application/font-woff'
          }
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url',
          query: {
            limit: 1,
            minetype: 'application/font-tff'
          }
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url',
          query: {
            limit: 1,
            minetype: 'image/svg+xml'
          }
        },
        {
          test: /\.css$/,
          loader: (BUILD) ? ExtractTextPlugin.extract('style','css?minimize') : 'style!css'
        },
        {
          test: /\.scss$/,
          loader: (BUILD) ? ExtractTextPlugin.extract('style','css?minimize!sass') : 'style!css!sass'
        }
      ]
    }
}
