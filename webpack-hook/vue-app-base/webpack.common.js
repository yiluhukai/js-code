const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
/**
 *
 * @type {import("webpack").Configuration}
 *
 *
 */
module.exports = {
	context: path.join(__dirname),
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]_[hash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader'
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
	// resolve: {
	// 	extensions: ['.js', '.vue']
	// }
}
