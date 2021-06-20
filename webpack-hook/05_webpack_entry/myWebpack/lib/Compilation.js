const { Tapable, SyncHook } = require('tapable')
const async = require('neo-async')
const path = require('path')
const ejs = require('ejs')
const NormalModuleFactory = require('./NormalModuleFactory')
const Parser = require('./Parser')
const Chunk = require('./Chunk')

const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()
class Compilation extends Tapable {
	constructor(compiler) {
		super()
		this.compiler = compiler
		this.context = compiler.context
		this.options = compiler.options
		// 让compilation具备文件读写的能力
		this.inputFileSystem = compiler.inputFileSystem
		this.outputFileSystem = compiler.outputFileSystem
		this.entries = [] // 打包的入口
		this.modules = [] //  存放所有模块的数据
		this.chunks = [] // 存在打包的chunk信息
		this.hooks = {
			succeedModule: new SyncHook(['module']),
			seal: new SyncHook(),
			beforeChunks: new SyncHook(),
			afterChunks: new SyncHook()
		}
		this.files = []
		this.assets = []
	}
	/**
	 * @param{ * } context 项目的根目录
	 * @param{ * } entry 项目的入口文件
	 * @param{ * } name chunkName
	 * @param { * } 传入的回调
	 */
	addEntry(context, entry, name, callback) {
		this._addModuleChain(context, entry, name, (err, module) => {
			callback(err, module)
		})
	}

	_addModuleChain(context, entry, name, callback) {
		// normalModuleFactory
		const resource = path.posix.join(context, entry)

		this.createModule(
			{
				name,
				context,
				rawRequest: entry,
				//返回entry的绝对路径
				resource,
				moduleId: './' + path.posix.relative(context, resource),
				// parser 编译生成ast的编译器
				parser
			},
			module => this.entries.push(module),
			callback
		)
	}
	/**
	 *
	 * @param { * } module 要打包的模块的相关信息
	 * @param {Function } doEntry 添加module 到 this.entries
	 * @param {*} callback  整个打包接受的回调函数
	 */
	createModule(data, doEntry, callback) {
		// normalModuleFactory
		let module = normalModuleFactory.create(data)

		const afterBuild = err => {
			if (module.dependences.length) {
				// 存在依赖
				this.buildDependences(module, () => callback(err, module))
			} else {
				callback(err, module)
			}
		}

		this.buildModule(module, afterBuild)
		// 完成build后我们需要对我们的模块进行保存
		// this.entries.push(entryModule)

		doEntry && doEntry(module)
		this.modules.push(module)
	}
	/**
	 *
	 * @param {NormalModule} module
	 * @param {*} callback
	 */
	buildModule(entryModule, callback) {
		entryModule.build(this, err => {
			//意味着我们的模块打包已经完成，触发对应的钩子
			this.hooks.succeedModule.call(entryModule)
			callback(err)
		})
	}
	/**
	 *
	 * @param {NormalModule} module
	 * @param {*} callback
	 */
	buildDependences(module, callback) {
		// 所以依赖都处理完成后，在执行callback
		const dependences = module.dependences
		// 如何知道所以依赖项都完成了打包操作呢  (neo-async)
		async.forEach(
			dependences,
			(dependence, done) => {
				this.createModule({ ...dependence, parser }, null, done)
			},
			callback
		)
	}
	/**
	 *
	 * @param {Function} callback
	 */
	seal(callback) {
		//  这块我们的钩子并没有对应的事件监听函数，但是我们依旧设置这些钩子，目的是为了直到我们这些操作对应的钩子的位置
		//  此外我们在外部向钩子上挂载事件监听
		this.hooks.seal.call()
		this.hooks.beforeChunks.call()

		// 我们当前的所有打包入口都存放在this.entries中
		// 所谓的chunk就是将入口文件和他的依赖提取到一块，然后再做合并
		for (const entryModule of this.entries) {
			const chunk = new Chunk(entryModule)
			// 处理chunk中包含的模块
			chunk.modules = this.modules.filter(module => module.name === chunk.name)
			// 保存chunk块
			this.chunks.push(chunk)
		}

		// 利用我们之前手写的	webpack打包后的内容作为模版文件，将模版文件和我们chunk中的模块的源码进行替换，
		// 生成我们需要的chunk.js

		// 这个钩子和我们上面的钩子一样
		this.hooks.afterChunks.call(this.chunks)
		// 生成chunk.js的内容
		this.createChunkAssets()
		callback()
	}

	createChunkAssets() {
		for (let i = 0; i < this.chunks.length; i++) {
			const chunk = this.chunks[i]
			const chunkName = chunk.name + '.js'
			chunk.files.push(chunkName)
			// 生成具体的内容
			// 01 获取模版文件的路径
			let tempPath = path.posix.join(__dirname, `./template/main.js`)
			// 02 读取模版文件的内容
			const tempCode = this.inputFileSystem.readFileSync(tempPath, 'utf8')
			// 03  获取渲染函数
			const tempRender = ejs.compile(tempCode)

			console.error('chunks', chunk)
			// 04 渲染数据
			const source = tempRender({
				entryModuleId: chunk.entryModule.moduleId,
				modules: chunk.modules
			})
			// 将chunk生成的assets保存起来
			this.emitAssets(chunkName, source)
		}
	}

	emitAssets(chunkName, source) {
		this.files.push(chunkName)
		this.assets[chunkName] = source
	}
}
module.exports = Compilation
