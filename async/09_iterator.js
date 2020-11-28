function* gen() {
	console.log('start')

	try {
		yield 2
	} catch (e) {
		console.log(e)
	}
}

const it = gen()

it.next()

it.throw(new Error('123'))

// start
// Error: 123
//   at Object.<anonymous> (/Users/lijunjie/js-code/async/09_iterator.js:17:10)
