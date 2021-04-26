const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack Tutorial',
			template: './src/index.html'
		})
	]
}
