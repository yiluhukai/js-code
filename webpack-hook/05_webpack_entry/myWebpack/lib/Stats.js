class Stats {
	constructor(compilation) {
		const { modules, entries, chunks, assets } = compilation
		this.modules = modules
		this.entry = entries
		this.chunks = chunks
		this.assets = assets
	}
	toJson() {
		return this
	}
}

module.exports = Stats
