// 非 Point Free 模式
// Hello World => hello_world
function f(word) {
	return word.toLowerCase().replace(/\s+/g, '_')
}
// Point Free
const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
console.log(f('Hello World'))
