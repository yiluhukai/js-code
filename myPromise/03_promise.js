const p = new Promise((resolve, reject) => {
	reject('123')
})

const p1 = new Promise((resolve, reject) => {
	resolve('hello')
})

p.then(undefined, () => {
	return p1
}).then(() => {
	console.log('hello')
})

const thenable = {
	then(resolve, reject) {
		resolve('hello12')
	}
}

const p2 = Promise.resolve(thenable)
console.log(p2)
p2.then(v => console.log(v))
