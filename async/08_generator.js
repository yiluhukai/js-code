//  生成器函数

function* gen() {
	console.log('start') // 1: 'start'
	const res = yield Promise.resolve(10)
	console.log('first', res) // 4: 124

	const res1 = yield Promise.resolve(111)

	console.log('second', res1) // 6: 125
}

//  返回一个可迭代的对象

const iterator = gen()

// 开始执行
const p1 = iterator.next()

console.log(p1) // 2 : { value: Promise { 10 }, done: false }
p1.value.then(val => {
	console.log(val) // 3 :  10
	if (!p1.done) {
		const p2 = iterator.next('124')
		p2.value.then(val => {
			console.log(val) //  5: 111
			if (!p2.done) {
				const p3 = iterator.next('125') //
				console.log(p3) // 7:{ value: undefined, done: true }
			}
		})
	}
})
