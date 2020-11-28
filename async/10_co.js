function* gen() {
	try {
		console.log('start')
		const res = yield Promise.resolve('123')
		console.log(res) // 123
		const res1 = yield Promise.reject(new Error('custom error'))
		console.log(res1)
	} catch (e) {
		console.log('handle error', e)
	}
}

function co(gen) {
	const it = gen()

	function next(val) {
		if (val.done) {
			return
		}
		val.value.then(
			val => {
				v = it.next(val)
				next(v)
			},
			err => {
				it.throw(err)
			}
		)
	}

	next(it.next()) //  开始执行代码
}

co(gen)
