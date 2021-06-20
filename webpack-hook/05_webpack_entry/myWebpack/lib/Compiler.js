const { Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelHook, SyncHook } = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')
const Stats = require('./Stats')
const path = require('path')
const mkdirp = require('mkdirp')
class Compiler extends Tapable {
	constructor(context) {
		super()
		// 添加一些钩子
		// 用到的时候我们再来添加
		this.hooks = {
			done: new AsyncSeriesHook(['stats']),
			beforeRun: new AsyncSeriesHook(['compiler']),
			run: new AsyncSeriesHook(['compiler']),
			entryOption: new SyncBailHook(['context', 'entry']),
			make: new AsyncParallelHook(['compilation']),
			beforeCompile: new AsyncSeriesHook(['params']),
			/** @type {SyncHook<CompilationParams>} */
			compile: new SyncHook(['params']),
			emit: new AsyncSeriesHook(['compilation'])
		}
		this.inputFileSystem = null
		this.outputFileSystem = null
	}
	emitAssets(compilation, callback) {
		// 创建dist目录，然后将chunks中的内容写入文件
		let outputPath = this.options.output.path
		const assets = compilation.assets
		//  工具方法；将chunk中的内容写入文件
		const emitFiles = err => {
			for (const file in assets) {
				let source = assets[file]
				let targetPath = path.posix.join(outputPath, file)
				this.outputFileSystem.writeFileSync(targetPath, source, 'utf8')
			}
			callback(err)
		}

		// 调用上面定义的方法写入文件
		this.hooks.emit.callAsync(compilation, () => {
			mkdirp(outputPath).then(emitFiles)
		})
	}
	run(callback) {
		const finalCallback = (err, stats) => {
			return callback(err, stats)
		}

		const onCompiled = (err, compilation) => {
			// 生成打包后的文件：
			this.emitAssets(compilation, () => {
				const stats = new Stats(compilation)
				this.hooks.done.callAsync(stats, err => {
					return finalCallback(err, stats)
				})
			})
		}

		this.hooks.beforeRun.callAsync(this, () => {
			this.hooks.run.callAsync(this, () => {
				this.compile(onCompiled)
			})
		})
	}

	createNormalModuleFactory() {
		const normalModuleFactory = new NormalModuleFactory()
		//this.hooks.normalModuleFactory.call(normalModuleFactory)
		return normalModuleFactory
	}
	newCompilationParams() {
		const params = {
			normalModuleFactory: this.createNormalModuleFactory()

			// contextModuleFactory: this.createContextModuleFactory(),
			// compilationDependencies: new Set()
		}
		return params
	}

	createCompilation() {
		return new Compilation(this)
	}

	newCompilation(params) {
		const compilation = this.createCompilation()

		return compilation
	}

	compile(callback) {
		const params = this.newCompilationParams()

		this.hooks.beforeCompile.callAsync(params, err => {
			if (err) return callback(err)

			this.hooks.compile.call(params)

			const compilation = this.newCompilation(params)

			this.hooks.make.callAsync(compilation, err => {
				if (err) return callback(err)
				// callback(null, new Stats(compilation))
				// 完成生成chunk的工作
				// seal 封上(信封); 密封(容器);这块是将不同的模块放入同一个chunk块中
				compilation.seal(() => callback(null, compilation))
			})
		})
	}
}

module.exports = Compiler
