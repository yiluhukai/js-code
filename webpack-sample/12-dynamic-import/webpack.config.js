const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	mode: 'none',
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					//'style-loader', 以style的方式插入文件
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Dynamic import',
			template: './src/index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin()
	]
}
