/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-05-06 00:11:42
 * @LastEditTime: 2021-05-06 00:50:14
 * @FilePath: /js-code/webpack-source/05_wp_esmodule/dist/custom_build.js
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

	// 08
	__webpack_require__.t = function () {}

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
	/***/ './src/index.js':
		/*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
		/*! no exports provided */
		/***/ function (module, __webpack_exports__, __webpack_require__) {
			'use strict'
			__webpack_require__.r(__webpack_exports__)
			/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.js */ './src/login.js')
			/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
				_login_js__WEBPACK_IMPORTED_MODULE_0__
			)

			console.log('index.js内容加载了')

			console.log(_login_js__WEBPACK_IMPORTED_MODULE_0___default.a, '---->')

			/***/
		},

	/***/ './src/login.js':
		/*!**********************!*\
      !*** ./src/login.js ***!
      \**********************/
		/*! no static exports found */
		/***/ function (module, exports) {
			// 01 采用 cms 导出模块内容
			module.exports = 'zce'

			// 02 采用 esModule 导出模块
			// export default 'zce'
			// export const age = 100

			/***/
		}

	/******/
})
