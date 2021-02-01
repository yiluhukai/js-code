const arr = [1, 3, 5]
for (const item of arr) {
	if (item == 3) {
		break
	}
	console.log(item)
	//1
}

arr.forEach(element => {
	console.log(element)
	//1
	// 3
	// 5
})

const myset = new Set()
myset.add(1).add(5).add(12)

for (const item of myset) {
	console.log(myset)
	//     Set { 1, 5, 12 }
	// Set { 1, 5, 12 }
	// Set { 1, 5, 12 }
}

const mymap = new Map([
	['a', 1],
	['b', 23]
])

console.dir(mymap[Symbol.iterator])

for (const item of mymap) {
	console.log(item)
	// [ 'a', 1 ]
	// [ 'b', 23 ]
}

// 使用解构

for (const [key, val] of mymap) {
	console.log(key, val)
	// a 1
	// b 23
}
const values = ['aaa', 'bbb', 'ccc']

const it = {
	[Symbol.iterator]() {
		let index = 0
		return {
			next() {
				return {
					value: values[index],
					done: index++ >= values.length
				}
			}
		}
	}
}

for (const item of it) {
	console.log(item)

	// aaa
	// bbb
	// ccc
}

const vals = {
	values: ['aaa12', 'bbb12', 'ccc12'],
	each(cb) {
		values.forEach(e => {
			cb(e)
		})
	},
	[Symbol.iterator]: function* () {
		for (const it of this.values) {
			yield it
		}
		// return {
		// 	next: () => {
		// 		return {
		// 			value: this.values[index],
		// 			done: index++ >= this.values.length
		// 		}
		// 	}
		// }
	}
}

for (const item of vals) {
	console.log('gen', item)
	// aaa
	// bbb
	// ccc
}

//vals.each(console.log)

//aaa
// bbb
// ccc

function* gen() {
	console.log('11')
	yield 11
	console.log('22')
	yield 22
}

const g = gen()

console.log(g.next())

console.log(g.next())

console.log(g.next())
// 11
// { value: 11, done: false }
// 22
// { value: 22, done: false }
// { value: undefined, done: true }

function* createIdMaker() {
	let index = 0

	while (true) {
		yield index++
	}
}

const idMaker = createIdMaker()

console.log(idMaker.next().value) //0
console.log(idMaker.next().value) //1
