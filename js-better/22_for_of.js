/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2021-02-27 21:55:56
 * @LastEditTime: 2021-02-27 22:00:06
 * @FilePath: /js-code/js-better/22_for_of.js
 */

const a = {
	x: 1,
	y: 2
}

for (const [key, val] of Object.entries(a)) {
	console.log(key, val)
}

for (const key in a) {
	console.log(key, a[key])
}
