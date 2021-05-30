/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-05-24 22:16:51
 * @LastEditTime: 2021-05-24 23:02:00
 * @FilePath: /js-code/webpack-hook/asyncHook/src/01_async_parallel_hook.js
 */

const { AsyncParallelHook } = require('tapable')

const asyncHook = new AsyncParallelHook(['name'])

// asyncHook.tap('fn1', function (name) {
// 	setTimeout(() => {
// 		console.log('fn1', '--->', name)
// 	}, 1000)
// })

// asyncHook.tap('fn2', function (name) {
// 	setTimeout(() => {
// 		console.log('fn1', '--->', name)
// 	}, 2000)
// })

// asyncHook.tap('fn3', function (name) {
// 	setTimeout(() => {
// 		console.log('fn1', '--->', name)
// 	}, 3000)
// })

// asyncHook.callAsync('ylp', function () {
// 	console.log('执行了回调函数')
// })

// console.time('time')

// asyncHook.tapAsync('fn1', function (name, callback) {
// 	setTimeout(() => {
// 		console.log('fn1', '--->', name)
// 		callback()
// 	}, 1000)
// })

// asyncHook.tapAsync('fn2', function (name, callback) {
// 	setTimeout(() => {
// 		console.log('fn2', '--->', name)
// 		callback()
// 	}, 2000)
// })

// asyncHook.callAsync('ylp', function () {
// 	console.log('最后一个钩子执行了')
// 	console.timeEnd('time')
// })

console.time('time')

asyncHook.tapPromise('fn1', function (name) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			console.log('fn1', '--->', name)
			resolve()
		}, 1000)
	})
})

asyncHook.tapPromise('fn2', function (name) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			console.log('fn2', '--->', name)
			resolve()
		}, 2000)
	})
})

asyncHook.promise('ylp').then(function () {
	console.log('最后一个钩子执行了')
	console.timeEnd('time')
})
