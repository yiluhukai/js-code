/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-05-24 22:16:51
 * @LastEditTime: 2021-05-24 23:07:08
 * @FilePath: /js-code/webpack-hook/asyncHook/src/02_async_parallel_bailhook.js
 */

const { AsyncParallelBailHook } = require('tapable')

const asyncHook = new AsyncParallelBailHook(['name'])

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
			resolve('error')
		}, 2000)
	})
})

asyncHook.tapPromise('fn3', function (name) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			console.log('fn3', '--->', name)
			resolve()
		}, 3000)
	})
})

asyncHook.promise('ylp').then(function () {
	console.log('最后一个钩子执行了')
	console.timeEnd('time')
})
