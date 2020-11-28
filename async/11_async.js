async function gen() {
	try {
		console.log('start')
		const res = await Promise.resolve('123')
		console.log(res) // 123
		//const res1 = await Promise.reject(new Error('custom error'))
		const res1 = await Promise.resolve(10)
		console.log(res1)

		return 2
	} catch (e) {
		console.log('handle error', e)
	}
}

const res = gen()

console.log(res)

res.then(result => {
	console.log('completed', result)
})

// start
// Promise { <pending> }
// 123
// 10
// completed
