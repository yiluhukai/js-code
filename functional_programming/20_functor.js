// 函子

// class Container {
// 	constructor(value) {
// 		this._value = value
// 	}
// 	// 对数据进行处理，返回一个新的函子
// 	map(fn) {
// 		return new Container(fn(this._value))
// 	}
// }

// const container = new Container(2)

//  改进

class Container {
	static of(val) {
		return new Container(val)
	}

	constructor(value) {
		this._value = value
	}
	// 对数据进行处理，返回一个新的函子
	map(fn) {
		return Container.of(fn(this._value))
	}
}

const container = Container.of(2)

const r = container.map(value => value + 2).map(val => val * val)

console.log(r)
