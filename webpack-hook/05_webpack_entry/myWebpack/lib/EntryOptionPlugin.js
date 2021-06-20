const SingleEntryPlugin = require('./SingleEntryPlugin')

function itemToPlugin(context, item, name) {
	return new SingleEntryPlugin(context, item, name)
}
class EntryOptionPlugin {
	apply(compiler) {
		// 注册一个entryOption钩子的事件监听

		compiler.hooks.entryOption.tap('EntryOptionPlugin', function (context, entry) {
			itemToPlugin(context, entry, 'main').apply(compiler)
		})
	}
}

module.exports = EntryOptionPlugin
