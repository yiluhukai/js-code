//  模拟lodash中的flowRight

// const flowRight = function (...arg) {
// 	return function (value) {
// 		return arg.reduceRight((prev, fn) => fn(prev), value)
// 	}
// }
// 使用es6简化

const flowRight = (...arg) => value => arg.reduceRight((prev, fn) => fn(prev), value)

const first = arr => arr[0]

const reverse = arr => arr.reverse()

const toUpper = s => s.toUpperCase()

const fn = flowRight(toUpper, first, reverse)

console.log(fn(['hello', 'world']))
