const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const Compiler = require('./Compiler')
const WebpackOptionsApply = require('./WebpackOptionsApply')
function webpack(options) {
	// 01 实例化compiler对象
	let compiler = new Compiler(options.context)
	compiler.options = options
	// 02 // 通过NodeEnvironmentPlugin为compiler对象添加文件读写能力
	new NodeEnvironmentPlugin().apply(compiler)
	// 03 挂载我们再配置项中传入的插件
	if (options.plugins && Array.isArray(options.plugins)) {
		options.plugins.forEach(plugin => {
			if (typeof plugin === 'function') {
				plugin.call(compiler, compiler)
			} else {
				plugin.apply(compiler)
			}
		})
	}
	// 04 加载webpack内置的默认的插件
	compiler.options = new WebpackOptionsApply().process(options, compiler)
	// 05返回实例对象
	return compiler
}

module.exports = webpack
