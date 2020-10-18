// 函数组合的调试

// 函数组合是将一个函数的返回值交给下一个函数

// NEVER SAY DIE => never-say-die

const _ = require('lodash')

const trace = _.curry((tag, v) => {
	console.log(tag, v)
	return v
})

//  curry为一元函数

const split = _.curry((seq, str) => _.split(str, seq))

const toLower = s => _.toLower(s)

const map = _.curry((fn, arr) => _.map(arr, fn))

//  curry为一元函数
const join = _.curry((seq, arr) => _.join(arr, seq))

//const fn = _.flowRight(join('-'), trace('join前'), toLower, trace('toLower前'), split(' '))
// 可以发现low的返回值不是一个数组，所以使用我们自定义的map函数
const fn = _.flowRight(join('-'), trace('join前'), map(toLower), trace('toLower前'), split(' '))
// 可以发现low的返回值不是一个数组，所以使用

console.log(fn('NEVER SAY DIE'))
