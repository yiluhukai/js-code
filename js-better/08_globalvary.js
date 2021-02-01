/**
 *
 * 全局变量和局部变量在jsperf中的对比
 *
 */

var i,
	str = ''

for (i = 0; i < 1000; i++) {
	str += i
}

// 局部变量的代码片段

for (let i = 0; i < 1000; i++) {
	let str = ''
	str += i
}
