//@ts-check
const path = require('path')
/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
	mode: 'none',
	entry: './src/index.js',
	//entry: './src/main.css',
	output: {
		filename: 'bundle.js',
		// 绝对路径
		path: path.join(__dirname, 'dist'),
		publicPath: 'dist/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.png$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024 // 10KB
					}
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}
