const fs = require('fs')
class NodeEnvironmentPlugin {
	constructor(options) {
		this.options = options || {}
	}

	apply(compiler) {
		compiler.inputFileSystem = fs
		compiler.outputFileSystem = fs
		compiler.hooks.beforeRun.tap('NodeEnvironmentPlugin', compiler => {
			console.log('before run')
		})
	}
}

module.exports = NodeEnvironmentPlugin
