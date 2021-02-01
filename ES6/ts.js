console.log(100 + '1') //'1001'

console.log(Math.floor(true)) //1

console.log(Math.floor('asdsa')) //NaN

const path = require('path')

//console.log(path.dirname(1111)) //TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type number

const a = {}

a.foo() //TypeError: a.foo is not a function

function sum(a, b) {
	if (typeof a !== 'number' && typeof b !== 'number') {
		throw new TypeError('arguments type is invalid')
	}

	return a + b
}

sum(1, 2) //3

sum(1, '2') //12
