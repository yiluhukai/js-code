const webpack = require('./myWebpack')
// const webpack = require('webpack')
const options = require('./webpack.config.js')

const compiler = webpack(options)

compiler.run(function (err, stats) {
	console.log(err)
	console.dir(stats.toJson())
})
