class Chunk {
	constructor(entryModule) {
		this.entryModule = entryModule
		this.name = entryModule.name
		// 记录我们打包完成后存在chunK的文件信息
		this.files = []
		//  组成chunk的所有的模块
		this.modules = []
	}
}

module.exports = Chunk
