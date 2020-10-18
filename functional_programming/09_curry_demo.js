//  面向过程的写法，代码无法复用
// ''.match(/\w+/g)
// ''.match(/\s+/g)
// 函数式编程

const _ = require('lodash')
function match(reg, str) {
	return str.match(reg)
}

//拆分成更细粒度的函数

const curried = _.curry(match)

const spaceMatch = curried(/\s+/g)
const numberMatch = curried(/\d+/g)

console.log(spaceMatch('hello  wolrd'))
console.log(numberMatch('123-321'))

//  匹配数组中每个元素

const filter = _.curry(function (func, arr) {
	return arr.filter(func)
})

console.log(filter(spaceMatch, ['hello world', 'abc']))
//拆分成更细粒度的函数,并复用之前的函数

const haveSpace = filter(spaceMatch)
const haveNumber = filter(numberMatch)

console.log(haveSpace(['hello world', 'abc']))

console.log(haveNumber(['hello world 123', 'abc 123']))
