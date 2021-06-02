const { Hook } = require('./Hook.js')

class AsyncCodeFactory {
	/**
	 * 保存钩子的执行函数到钩子实例的_x中，然后生成的执行到代码是对象_x中函数的调用
	 */
	_args({ before, after } = {}) {
		let allArgs = this.args
		if (before) allArgs = [before].concat(allArgs)
		if (after) allArgs = allArgs.concat(after)
		return allArgs.join(',')
	}

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

	header() {
		return `var _context;\nvar _x = this._x;\n`
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

	/**
	 *
	 * 生成对钩子的执行代码
	 */
	// function anonymous(name, _callback) {
	//     "use strict";
	//     var _context;
	//     var _x = this._x;
	//     do {
	//         var _counter = 2;
	//         var _done = (function() {
	//             _callback();
	//         });

	//         if(_counter <= 0) break;

	//         var _fn0 = _x[0];
	//         _fn0(name, function() {   if(--_counter === 0) _done();})
	//         if(_counter <= 0) break;
	//         var _fn1 = _x[1];
	//         _fn1(name, (function(_err1) {   if(--_counter === 0) _done();})
	//     } while(false);
	// }
	create(options) {
		this.init(options)
		let content = `do {\n _counter = ${options.taps.length};\n var _done = (function() {\n_callback();\n});`

		for (let i = 0; i < this.options.taps.length; i++) {
			content += ` if(_counter <= 0) break; var _fn${i} = _x[${i}];
                _fn${i}(${this.args.join(',')},
				function () {
					if (--_counter === 0) {
						_done()
					}
				});`
		}
		content += '\n} while(false)'
		const fn = new Function(this._args({ after: '_callback' }), this.header() + content)
		this.deinit()
		return fn
	}
}

const fatcory = new AsyncCodeFactory()

class AsyncParallelHook extends Hook {
	constructor(args) {
		super(args)
	}
	/**
	 * 实现对SyncHook的调用
	 */
	callAsync(...args) {
		let call = this._createCall('async')
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

module.exports = { AsyncParallelHook }
