export { name, SayHello, default as Person } from './moduleA.js'
// console.log(name)

// console.log(typeof Person)

//import age, { name } from './moduleA.js'
//import {} from './util/index.js'
//import './util/index.js'
// import {  } from '/util/index.js'
// console.log(foo)
//import * as moduleA from './moduleA.js'

//export { name, SayHello, Person }

import('./util/index.js').then(module => {
	console.log(module.foo) //
})

// console.log(moduleA.name, moduleA.default) //hello 12
// //name = '100'
// setTimeout(() => {
// 	console.log(moduleA.name, moduleA.default) //baz 12
// }, 5000)
