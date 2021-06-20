class SingleEntryPlugin {
	constructor(context, entry, name) {
		this.context = context
		this.entry = entry
		this.name = name
	}

	apply(compiler) {
		compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
			const { entry, name, context } = this
			console.log('make钩子被触发了')
			console.log(entry, name, context)
			compilation.addEntry(context, entry, name, callback)
		})
	}
}

module.exports = SingleEntryPlugin
