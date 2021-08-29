const commonConfigs = require('./webpack.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 *
 * @type {import("webpack").Configuration}
 *
 *
 */

const prodConfigs = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.less$/,
				loader: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 大于 8K使用file-loader,需要安装file-loader作为依赖
							limit: 8,
							esModule: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			title: 'My App',
			templateParameters: {
				BASE_URL: './public/'
			}
		})
	]
}
module.exports = merge({}, commonConfigs, prodConfigs)
