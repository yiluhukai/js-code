// 记忆函数
const _ = require('lodash')

function getArea(r) {
	console.log(r)
	return Math.PI * r * r
}

// const _getArea = _.memoize(getArea)

// console.log(_getArea(2))
// console.log(_getArea(2))
// console.log(_getArea(2))

// 自己实现memoize

function _memoize(func) {
	const cache = {}
	return function () {
		const key = JSON.stringify(arguments)
		cache[key] = cache[key] || func.apply(func, arguments)

		return cache[key]
	}
}
const _getArea = _memoize(getArea)

console.log(_getArea(2))
console.log(_getArea(2))
console.log(_getArea(2))
