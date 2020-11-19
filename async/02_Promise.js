//Promise的链式调用
const ajax = require('./01_Promise.js')

// ajax('/api/employees')
// 	.then(res => {
// 		console.log(res)
// 	})
// 	.then(() => {
// 		return 12
// 	})
// 	.then(val => {
// 		console.log(val)
// 	})

// ajax('/api/url')
// 	.then(res => {
// 		return ajax(res.url)
// 	})
// 	.then(res => {
// 		return ajax(res.url)
// 	})
// 	.then(res => {
// 		console.log(res)
// 	})
let p1 = null

const p2 = ajax('/api/url')
	.then(res => {
		return ajax(res.url)
	})
	.then(res => {
		p1 = ajax(res.url)

		console.log(p1)
		return ajax(res.url)
	})

p2.then(() => {
	console.log(p1, p2)
	console.log(p1 === p2) // false
})
