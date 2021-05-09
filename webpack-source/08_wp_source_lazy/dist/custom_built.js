/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-05-06 00:11:42
 * @LastEditTime: 2021-05-09 13:04:59
 * @FilePath: /js-code/webpack-source/08_wp_source_lazy/dist/custom_built.js
 * @Description: 手写打包的执行函数
 *
 */

;(function (modules) {
	// 01 定义一个对象用于缓存对象
	const installedModules = {}
	// 02 定义一个函数用于加载模块
	function __webpack_require__(moduleId) {
		// 判断是否已经加载过了，如果加载过了，从缓存中读取
		if (installedModules[moduleId]) {
			return installedModules[moduleId]
		}
		// 将模块放入缓存中
		let module = (installedModules[moduleId] = {
			i: moduleId,
			l: false, // hasloaded?
			exports: {}
		})

		// 执行模块的代码

		modules[moduleId].call(module, module, module.exports, __webpack_require__)

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
		Object.defineProperty(ns, 'defult', { enumerable: true, value: value })
		// mode&2 && value是个对象，将value的属性复制成ns的getter方法
		if (mode & 2 && typeof value !== 'string') {
			for (const key in value) {
				__webpack_require__.d(
					ns,
					key,
					function (key) {
						return function () {
							return ns[key]
						}
					}.bind(null, key)
				)
			}
		}
		return ns
	}

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

	// 10  publicPath
	__webpack_require__.p = ''

	return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
	'./src/index.js': function (module, exports, __webpack_require__) {
		let name = __webpack_require__.t(/*! ./login.js */ './src/login.js', 0b0111)
		console.log('index.js执行')
		console.log(name)
	},
	'./src/login.js': function (module, exports) {
		module.exports = 'zce'
	}
})
