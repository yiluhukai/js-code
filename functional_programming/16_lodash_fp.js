// 函数组合的调试

// 函数组合是将一个函数的返回值交给下一个函数

// NEVER SAY DIE => never-say-die

//  对比15中的实现，可以看出lodash中fp模块对函数式编程更加友好
const fp = require('lodash/fp')

const fn = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

console.log(fn('NEVER SAY DIE'))
