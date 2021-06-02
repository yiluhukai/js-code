class Hook {
	constructor(args) {
		this._args = args
		this.taps = []
		this._x = undefined
	}

	_tap(type, options, fn) {
		if (typeof options === 'string') {
			options = { name: options }
		}
		//  将fn函数合并进去

		options = Object.assign({ fn, type }, options)

		// 掉用this._insert方法去保存options到 this.taps上
		this._insert(options)
	}

	/**
	 * 使用tap方法去注册同步钩子的处理事件
	 */

	tap(options, fn) {
		this._tap('sync', options, fn)
	}

	_insert(item) {
		this.taps[this.taps.length] = item
	}

	/**
	 * 异步钩子添加事件的方法
	 */
	tapAsync(options, fn) {
		this._tap('async', options, fn)
	}
}

module.exports = {
	Hook
}
