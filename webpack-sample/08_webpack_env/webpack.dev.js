const common = require('./webpack.common')
const { merge } = require('webpack-merge')
// @ts-ignore
module.exports = merge(common, {
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		//hot: true
		// hotOnly: true
	}
})
