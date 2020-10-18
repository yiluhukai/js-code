// 函数组合的规律

const _ = require('lodash')

//const fn = _.flowRight(_.toUpper, _.first, _.reverse)
//const fn = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const fn = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
console.log(fn(['first', 'second', 'third']))
