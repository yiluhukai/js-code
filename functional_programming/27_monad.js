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

	join() {
		return this._value()
	}

	flatMap(fn) {
		return this.map(fn).join()
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

const r = readFile('../package.json').map(fp.toUpper).flatMap(printf).join()

console.log(r)
