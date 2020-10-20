//  IO函子
const fp = require('lodash/fp')
const process = require('process')
class IO {
	static of(x) {
		return new IO(function () {
			return x
		})
	}

	constructor(fn) {
		this._value = fn
	}

	map(fn) {
		return new IO(fp.flowRight(fn, this._value))
	}
}

// 打印环境变量

let io = IO.of(process).map(p => p.execPath)
console.log(io._value())
