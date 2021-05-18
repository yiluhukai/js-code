const { SyncBailHook } = require('tapable')

// 创建一个SyncHook实例
const sh = new SyncBailHook(['name', 'age'])
// 注册监听事件
sh.tap('fn1', function (name, age) {
	console.log('fn1', name, age)
})

sh.tap('fn2', function (name, age) {
	console.log('fn2', name, age)
	return false
})

sh.tap('fn3', function (name, age) {
	console.log('fn3', name, age)
})

sh.call('yiluhuakai', 25)
