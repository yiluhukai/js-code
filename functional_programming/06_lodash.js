// lodash的方法
// first、last、reverse、each、find、findIndex
const _ = require('lodash')

const arr = ['cat', 'dog', 'pig']

console.log(_.first(arr))

console.log(_.last(arr))
//  会改变原数组
console.log(_.reverse(arr)) // [ 'pig', 'dog', 'cat' ]

r = _.each(arr, (item, index) => {
	console.log(item, index)
})
//
console.log(r) // [ 'pig', 'dog', 'cat' ]
