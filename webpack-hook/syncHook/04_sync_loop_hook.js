const { SyncLoopHook } = require('tapable')

// 创建一个SyncHook实例
const sh = new SyncLoopHook(['name', 'age'])

let count1 = 0,
	count2 = 0
// 注册监听事件
sh.tap('fn1', function (name, age) {
	console.log('fn1', name, age)
	if (++count1 === 1) {
		return undefined
	}
	//return false
})

sh.tap('fn2', function (name, age) {
	console.log('fn2', name, age)
	if (++count2 === 1) {
		//count2 = 0
		return false
	}
	return undefined
})

sh.tap('fn3', function (name, age) {
	console.log('fn3', name, age)
})

sh.call('yiluhuakai', 25)
