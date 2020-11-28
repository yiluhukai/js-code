const ajax = require('./01_Promise.js')

window.addEventListener('unhandledrejection', e => {
	const { reason, promise } = e
	//  reason 是一个错误对象 ，Promise是对应的promise
	console.log(reason, promise)
})

ajax('/api/employees').then(res => {
	console.log(re)
})
