const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'none',
	stats: 'none',
	devtool: 'source-map',
	plugins: [new HtmlWebpackPlugin()],
	devServer: {
		contentBase: './',
		index: 'index.html',
		filename: 'bundle.js',
		proxy: {
			'/api': {
				target: 'http://localhost:8080/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		}
	}
}
