const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
/**
 *
 * @type {import("webpack").Configuration}
 *
 */
module.exports = {
	mode: 'none',
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name]-[contenthash:8].bundle.js'
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
	optimization: {
		// 指定压缩使用的插件
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Dynamic import',
			template: './src/index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash:8].bundle.css'
		})
		//new OptimizeCssAssetsPlugin()
	]
}
