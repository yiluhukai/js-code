// module.exports = {
// 	foo: 'hello'
// }

//exports.foo = 'hello'

import('./esm.mjs').then(module => {
	console.log(module)
})
