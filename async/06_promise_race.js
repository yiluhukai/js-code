//  实现一个待请求超时的ajax
const ajax = require('./01_Promise.js')
const timeOut = new Promise(function (resove, reject) {
	setTimeout(() => {
		reject(new Error('超时'))
	}, 500)
})

//const getUrl = ajax('/api/urls')

const request = function (url) {
	return Promise.race([ajax(url), timeOut])
}
// chrome 的network中可以设置请求的网速，当网速比较慢的时候就会出现超时的情况
request('/api/employees')
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})
