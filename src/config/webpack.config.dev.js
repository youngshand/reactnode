/*eslint-disable no-unused-vars*/
import webpack from 'webpack';
import Promise from 'es6-promise';

require('es6-promise').polyfill();

const WEBPACK_DEV_PORT = process.env.WEBPACK_DEV_PORT || 8080;

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

console.log('//////////////////////////////////////////');
console.log('////// WEBPACK BUILDING FOR LOCAL ////////');
console.log('//////////////////////////////////////////');

module.exports = {
	devtool: 'source-map',

	entry: [
			`webpack-dev-server/client?http://localhost:${WEBPACK_DEV_PORT}`,
			'webpack/hot/only-dev-server',
			'./src/client/entry',
			'./scss/main.scss'
		],
	output: {
		path: '/js',
		chunkFilename: '[name].js',
		filename: 'app.js',
		publicPath: 'http://localhost:' + WEBPACK_DEV_PORT + '/js/'
	},
	plugins: [
			// local plugins
			new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new BrowserSyncPlugin({
				ui: false,
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
	module: {
		loaders: [
			{
				test: require.resolve('react'),
				loader: 'expose-loader?React'
			},
			{
				test: /\.js?$/,
				loaders: ['react-hot-loader', 'babel-loader'],
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
				loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}
		]
	}
}
