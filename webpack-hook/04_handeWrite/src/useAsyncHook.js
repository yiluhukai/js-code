// 异步并行钩子
const { AsyncParallelHook } = require('./AsyncParallelHook')

const asyncHook = new AsyncParallelHook(['name'])

asyncHook.tapAsync('fn1', function (name, callback) {
	setTimeout(() => {
		console.log('fn1', '--->', name)
		callback()
	}, 1000)
})

asyncHook.tapAsync('fn2', function (name, callback) {
	setTimeout(() => {
		console.log('fn2', '--->', name)
		callback()
	}, 2000)
})

asyncHook.callAsync('ylp', function () {
	console.log('最后一个钩子执行了')
})
