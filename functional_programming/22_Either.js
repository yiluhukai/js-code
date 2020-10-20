// Either函子 可以通过继承container函子来实现

class Left {
	static of(value) {
		return new Left(value)
	}

	constructor(value) {
		this._value = value
	}
	//  map方法返回当前的函子
	map(fn) {
		return this
	}
}

class Right {
	static of(value) {
		return new Right(value)
	}

	constructor(value) {
		this._value = value
	}

	map(fn) {
		return Right.of(fn(this._value))
	}
}

//  处理异常

function parseJson(json) {
	try {
		return Right.of(JSON.parse(json))
	} catch (error) {
		return Left.of({ error: error.message })
	}
}

//const r = parseJson({ name: 'hello' }).map(a => a.name.toUpperCase())
const r = parseJson('{"name":"hello"}').map(a => a.name.toUpperCase())
console.log(r)
