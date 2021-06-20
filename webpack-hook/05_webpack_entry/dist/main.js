/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-05-06 00:11:42
 * @LastEditTime: 2021-06-21 00:53:16
 * @FilePath: /js-code/webpack-hook/05_webpack_entry/myWebpack/lib/template/main.js
 * @Description: 手写打包的执行函数
 *
 */

;(function (modules) {
	// 12 定义一个json脚本加载时的方法
	function webpackJsonpCallback(data) {
		const chunkIds = data[0]
		const moreModules = data[1]

		// 修改chunk的加载状态
		let chunkId,
			moduleId,
			resolves = []
		for (let i = 0; i < chunkIds.length; i++) {
			chunkId = chunkIds[i]
			// chunk是自身属性且存在 == promise
			if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
				//	取出对应模块promise的resolve()
				resolves.push(installedChunks[chunkId][0])
			}
			// 修改chunk的加载状态为以加载
			installedChunks[chunkId] = 0
		}

		// 将加载的chunk合并到installedModules中

		for (moduleId in moreModules) {
			// moreModules的属性
			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId]
			}
		}

		// 执行resolve()方法
		while (resolves.length) {
			resolves.shift()()
		}
	}
	// 13 定义一个变量保存chunk的加载状态
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded

	const installedChunks = {
		main: 0
	}
	// 01 定义一个对象用于缓存对象
	const installedModules = {}
	// 02 定义一个函数用于加载模块
	function __webpack_require__(moduleId) {
		// 判断是否已经加载过了，如果加载过了，从缓存中读取
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports
		}
		// 将模块放入缓存中
		let module = (installedModules[moduleId] = {
			i: moduleId,
			l: false, // hasloaded?
			exports: {}
		})

		// 执行模块的代码

		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

		// 修改模块为已经加载
		module.l = true
		return module.exports
	}
	// 在__webpack_require__挂在一些属性
	// 03 保存modules
	__webpack_require__.m = modules
	// 04 保存缓存对象
	__webpack_require__.c = installedModules
	// 检查对象有没有这个属性
	__webpack_require__.o = function (exports, name) {
		return Object.prototype.hasOwnProperty.call(exports, name)
	}
	// 06 给导出对象getter属性
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter })
		}
	}
	// 07 给对象添加ES Module标记
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== undefined && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { enumerable: true, value: 'Module' })
		}
		Object.defineProperty(exports, '__esModule', { value: true })
	}

	// 08 懒加载使用的方法，value 代表要加载的模块名称
	// mode参数决定了我们如何处理加载后的结果

	__webpack_require__.t = function (value, mode) {
		// 加载模块
		if (mode & 1) value = __webpack_require__(value)
		// CommonJS 模块
		if (mode & 8) return value
		// ES Module
		if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value
		var ns = Object.create(null)
		// 标记成`ES Module`
		__webpack_require__.r(ns)
		// 添加default属性
		Object.defineProperty(ns, 'default', { enumerable: true, value: value })
		// mode&2 && value是个对象，将value的属性复制成ns的getter方法
		if (mode & 2 && typeof value !== 'string') {
			for (const key in value) {
				__webpack_require__.d(
					ns,
					key,
					function (key) {
						return ns[key]
					}.bind(null, key)
				)
			}
		}
		return ns
	}

	//  11 定义全局对象的webpackJsonp
	const jsonpArr = (window['webpackJsonp'] = window['webpackJsonp'] || [])
	// 修改jsonpArr 和window['webpackJsonp']的push方法
	const oldJsonpFunction = jsonpArr.push.bind(jsonpArr)

	jsonpArr.push = webpackJsonpCallback

	//09  返回模块的默认导出 从a 属性
	__webpack_require__.n = function (module) {
		let getter =
			module && module.__esModule
				? function getDefault() {
						return module['default']
				  }
				: function getModuleExports() {
						return module
				  }
		__webpack_require__.d(getter, 'a', getter)
		return getter
	}
	// 15 jsonpScriptSr函数

	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + '' + chunkId + '.my-built.js'
	}
	// 14 定义__webpack_require__.e

	__webpack_require__.e = function (chunkId) {
		var promises = []
		var installedChunkData = installedChunks[chunkId]

		if (installedChunkData !== 0) {
			if (installedChunkData) {
				// promise
				promises.push(installedChunkData)
			} else {
				// undefined ｜｜ null
				var promise = new Promise(function (resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject]
				})
				// 将promise保存为第三个参数 并放入promises中
				promises.push((installedChunkData[2] = promise))
			}
		}

		// 创建一个script标签
		const script = document.createElement('script')

		script.src = jsonpScriptSrc(chunkId)

		document.head.appendChild(script)

		return Promise.all(promises)
	}

	// 10  publicPath
	__webpack_require__.p = ''

	return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
	// /***/ './src/index.js':
	// 	/*! no static exports found */
	// 	/***/ function (module, exports, __webpack_require__) {
	// 		let oBtn = document.getElementById('btn')

	// 		oBtn.addEventListener('click', function () {
	// 			__webpack_require__
	// 				.e(/*! import() | login */ 'login')
	// 				.then(__webpack_require__.t.bind(null, /*! ./login.js */ './src/login.js', 7))
	// 				.then(login => {
	// 					console.log(login)
	// 				})
	// 		})

	// 		console.log('index.js执行了')

	// 		/***/
	// 	}
	
	
		'./src/index.js':
		function(module, exports, __webpack_require__){
			let title = __webpack_require__("./src/title.js");

console.log(title);
console.log('index.js执行了');	
		},
	
		'./src/title.js':
		function(module, exports, __webpack_require__){
			module.exports = 'title';	
		},
	
})
