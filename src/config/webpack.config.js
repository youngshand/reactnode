/*eslint-disable no-unused-vars*/
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import Promise from 'es6-promise';

require('es6-promise').polyfill();

const WEBPACK_DEV_PORT = process.env.WEBPACK_DEV_PORT || 8080;
const ENV = process.env.NODE_ENV || 'local';
const BUILD = (ENV === 'staging' || ENV === 'production');

// local only requirements
// these are excluded from the production dependencies so the imports happen within
// an if statements using the require function
let BrowserSyncPlugin;
let ForceCaseSensitivityPlugin
let persistentPlugins;

if (ENV === 'local') {
	BrowserSyncPlugin = require('browser-sync-webpack-plugin');
	ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

	persistentPlugins = [
		new ForceCaseSensitivityPlugin(),
		new webpack.NoErrorsPlugin()
	];
}

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
  plugins: BUILD ? [ // production plugins
			new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.js' }),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false
			}),
			new ExtractTextPlugin({
				filename: 'css/style.css',
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
			}, {
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
				loader: (BUILD) ? ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?minimize' }) : 'style!css'
			},
			{
				test: /\.scss$/,
				loader: (BUILD) ? ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?minimize!sass' }) : 'style!css!sass'
			}
		]
	}
}
