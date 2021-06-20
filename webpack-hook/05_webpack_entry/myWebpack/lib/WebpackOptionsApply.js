const EntryOptionPlugin = require('./EntryOptionPlugin')
class WebpackOptionsApply {
	process(options, compiler) {
		// 加载EntryOptionPlugin插件
		new EntryOptionPlugin().apply(compiler)
		// 执行`entryOption钩子：
		compiler.hooks.entryOption.call(options.context, options.entry)
		//
		return options
	}
}

module.exports = WebpackOptionsApply
