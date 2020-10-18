// lodash/fp和lodash中map方法的不同
const _ = require('lodash')

console.log(_.map(['1', '2', '3'], parseInt)) //[ 1, NaN, NaN ]

//parseInt(1,0,[1,2,3])
//parseInt(2,1,[1,2,3])
//parseInt(3,2,[1,2,3])

const fp = require('lodash/fp')

//parseInt只接受一个参数

console.log(fp.map(parseInt, ['1', '2', '3'])) //[ 1, 2, 3 ]
