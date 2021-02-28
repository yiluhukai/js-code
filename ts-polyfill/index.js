'use strict'
//import 'core.js'
require('core.js/feature/Object')
var p = { name: 'sss', age: 20, gender: 'female' }
for (var _i = 0, _a = Object.entries(p); _i < _a.length; _i++) {
	var _b = _a[_i],
		key = _b[0],
		value = _b[1]
	console.log(key, value)
}
