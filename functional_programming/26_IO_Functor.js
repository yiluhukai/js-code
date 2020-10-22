// IO函子的问题
const fp = require('lodash/fp')
const fs = require('fs')
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

// cat 命令

function readFile(fileName) {
	return new IO(function () {
		return fs.readFileSync(fileName, 'utf-8')
	})
}

function printf(x) {
	return new IO(function () {
		console.log(x)
		return x
	})
}

//  组合这两个函数

// cat函数 IO{_value:function(){return IO{_value}}}

// cat函数需要调用两次_value()才能得到值
// const cat = fp.flowRight(printf, readFile)

// const r = cat('../package.json')._value()._value()

// console.log(r)

const r = readFile('../package.json').map(printf)._value()._value()
