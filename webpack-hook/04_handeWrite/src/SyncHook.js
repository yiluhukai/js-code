const { Hook } = require('./Hook.js')

class SyncCodeFactory {
	/**
	 * 保存钩子的执行函数到钩子实例的_x中，然后生成的执行到代码是对象_x中函数的调用
	 */
	setup(instance, options) {
		instance._x = options.taps.map(option => option.fn)
	}

	/**
	 * 保存信息到当前的factory实例上
	 */
	init(options) {
		this.options = options
		this.args = options.args.slice()
	}

	/*
    
        我们的factory是单例的，所以我们使用完要清除factory上的信息
    */

	deinit() {
		this.options = undefined
		this.args = undefined
	}

	/**
	 *
	 * 生成对钩子的执行代码
	 */

	create(options) {
		this.init(options)
		let content = `var _x =  this._x;`
		for (let i = 0; i < this.options.taps.length; i++) {
			content += `var _fn${i} = _x[${i}];_fn${i}(${this.args.join(',')});`
		}
		const fn = new Function(this.args.join(','), content)
		this.deinit()
		return fn
	}
}

const fatcory = new SyncCodeFactory()

class SyncHook extends Hook {
	constructor(args) {
		super(args)
	}
	/**
	 * 实现对SyncHook的调用
	 */
	call(...args) {
		let call = this._createCall('sync')
		return call.apply(this, args)
	}

	_createCall(type) {
		// 传递taps和args给factory
		return this.compile({
			taps: this.taps,
			type,
			args: this._args
		})
	}

	/**
	 *
	 * @param {*} options
	 *
	 * 调用factory的方法生成钩子的执行函数
	 */
	compile(options) {
		fatcory.setup(this, options)
		return fatcory.create(options)
	}
}

module.exports = { SyncHook }
