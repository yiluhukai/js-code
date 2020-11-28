console.log('globle')

//  宏任务
setTimeout(() => {
	console.log('setTimeout')
})

// 微任务
process.nextTick(() => {
	console.log('nextTick')
})

console.log('hello')

//globle
//hello
//nextTick
// setTimeout
