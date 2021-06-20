const types = require('@babel/types')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const path = require('path')
class NormalModule {
	constructor({ context, rawRequest, name, resource, parser, moduleId }) {
		this.context = context
		this.rawRequest = rawRequest
		this.name = name
		this.resource = resource
		// TODO 其他的
		this._source = null // 保存模块的源码
		this._ast = null // 生成抽象语法树
		// 待实现
		this.parser = parser
		this.dependences = []
		this.moduleId = moduleId
	}

	build(compilation, callback) {
		/**
		 *  01 读取文件模块的内容
		 *  02 如果模块是非js文件，使用`loader`对文件的内容做一个转换
		 *  03 将js代码转换成抽象语法树
		 *  04 如果当前模块依赖了其他的模块，需要递归查找依赖
		 *
		 */

		this.doBuild(compilation, err => {
			// 生成ast
			this._ast = this.parser.parse(this._source)
			// 通过对AST语法树上节点的内容进行修改完成对源码中内容的替换
			traverse(this._ast, {
				// 根据节点的类型去遍历，这里查找的是type === 'CallExpression'
				CallExpression: nodePath => {
					let node = nodePath.node
					if (node.callee.name === 'require') {
						let modulePath = node.arguments[0].value // "./title"
						// 使用"/"将modulePath分割
						let moduleName = modulePath.split(path.posix.sep).pop()
						//我们打包器只处理js模块
						let extName = moduleName.indexOf('.js') !== -1 ? '' : '.js'
						moduleName += extName
						// 获取文件的绝对路径
						let depResource = path.posix.join(path.dirname(this.resource), moduleName)

						// 生成moduleId  绝对路径 - this.context
						let depModuleId = './' + path.posix.relative(this.context, depResource)

						// console.log(moduleName, depResource, depModuleId)

						//生成依赖
						this.dependences.push({
							name: this.name,
							context: this.context,
							rawRequest: moduleName,
							resource: depResource,
							moduleId: depModuleId
						})

						// 替换节点的内容：
						node.callee.name = '__webpack_require__'
						//	修改节点类型为 "stringLiteral"的内容
						node.arguments = [types.stringLiteral(depModuleId)]
					}
				}
			})
			// 利用修改后的ast去生成新的代码
			let { code } = generator(this._ast)
			this._source = code
			callback(err)
		})
	}
	//
	doBuild(compilation, callback) {
		this.getSource(compilation, (err, source) => {
			if (err) {
				console.log(err)
				return
			}
			this._source = source
			callback(err)
		})
	}

	getSource(compilation, callback) {
		compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
	}
}

module.exports = NormalModule
