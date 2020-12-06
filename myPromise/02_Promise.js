/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2020-12-06 19:17:02
 * @LastEditTime: 2020-12-06 20:00:10
 * @FilePath: /js-code/myPromise/02_Promise.js
 */

const p = new Promise((resolve, reject) => {
	resolve('hello')
})

const p2 = p.then(val => {
	console.log(val)
	return p2
})
