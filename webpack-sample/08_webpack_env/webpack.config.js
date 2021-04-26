const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const configs = {
	entry: './src/main.js',
	mode: 'development',
	output: {
		filename: 'js/bundle.js'
	},
	devtool: 'source-map',
	devServer: {
		//hot: true
		//hotOnly: true
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
		}),
		new DefinePlugin({
			base_url: '"http://localhost/api"'
		})
	]
}
// env是打包时通过命令行传入的--env 参数
// argv打包时通过命令行传入的所有参数
module.exports = (env, argv) => {
	if (env === 'production') {
		configs.mode = 'production'
		configs.devtool = 'none'
		// 引入生产环境需要的插件
		configs.plugins = [...configs.plugins, new CleanWebpackPlugin(), new CopyPlugin(['public'])]
	}
	return configs
}
