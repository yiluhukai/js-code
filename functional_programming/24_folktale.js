const { compose, curry } = require('folktale/core/lambda')

const { toUpper, first } = require('lodash/fp')
// folktale的curry 第一个参数是函数中参数的个数
const fn = curry(2, (x, y) => x + y)

console.log(fn(2, 3))

console.log(fn(2)(3))

//  compose

const func = compose(toUpper, first)

console.log(func(['hello', 'world']))
