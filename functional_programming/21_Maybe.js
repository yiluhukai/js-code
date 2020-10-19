//  Maybe函子

class Maybe {
	static of(val) {
		return new Maybe(val)
	}

	constructor(value) {
		this._value = value
	}
	// 对数据进行处理，返回一个新的函子
	map(fn) {
		//如果对空值变形的话直接返回 值为 null 的函子
		return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
	}

	isNothing() {
		return this._value === null || this._value === undefined
	}
}

const r1 = Maybe.of(null).map(val => val.toUpperCase())

console.log(r1)

const r = Maybe.of(2)
	.map(value => value + 2)
	.map(val => val * val)

console.log(r)
