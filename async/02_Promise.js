//Promise的链式调用
const ajax = require('./01_Promise.js')

ajax('http://localhost:8080/ping')
	.then(res => {
		console.log(res)
	})
	.then(() => {
		return 12
	})
	.then(val => {
		console.log(val)
	})
