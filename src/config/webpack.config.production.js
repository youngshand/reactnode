/*eslint-disable no-unused-vars*/
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Promise from 'es6-promise';

require('es6-promise').polyfill();

console.log('//////////////////////////////////////////');
console.log('//// WEBPACK BUILDING FOR PRODUCTION /////');
console.log('//////////////////////////////////////////');

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: {
		app: [
			'./src/client/entry',
			'./scss/main.scss'
		],
		vendor: ['react', 'react-dom', 'react-router', 'react-helmet', 'react-redux']
	},
	output: {
		path: __dirname + '/../../dist',
		filename: 'js/app.js'
	},
	plugins: [ // production plugins
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
				loaders: ['babel-loader'],
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
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?minimize' })
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?minimize!sass' })
			}
		]
	}
}
