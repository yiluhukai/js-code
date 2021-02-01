const name = 'tom'

// const o = { name: name }
// const o1 = { name }

// const obj = {
// 	[name]: '123',
// 	sayName() {
// 		console.log(this.name)
// 	}
// }

// console.log(obj) // { tom: '123' }

// const source = {
// 	a: 1,
// 	b: 2
// }

// const target = {
// 	a: 2,
// 	c: 3
// }
// const res = Object.assign(target, source)
// console.log(res) //{ a: 1, c: 3, b: 2 }
// console.log(target) // { a: 1, c: 3, b: 2 }
// console.log(res == target) //true
// const result = Object.assign({}, target, source) //{ a: 1, c: 3, b: 2 }
// // 等价于
// const res = { ...target, ...source }

// console.log(result) // { a: 1, c: 3, b: 2 }
// console.log(res) //{ a: 1, c: 3, b: 2 }

// console.log(2 == '2') //  true
// console.log(2 === '2') // false

// console.log(+0 === -0) // true
// console.log(NaN === NaN) //false

// console.log(Object.is(+0, -0)) // false
// console.log(Object.is(NaN, NaN)) // true

// const o = {}

// // Object.defineProperty(o, 'name', {
// // 	set(name) {
// // 		console.log('set name')
// // 		this._name = name
// // 	},
// // 	get() {
// // 		console.log('get name')
// // 		return this._name
// // 	}
// // })

// // o.name = 'tim' // set name
// // o.name //get name

// const proxy = new Proxy(o, {
// 	// get(target, property) {
// 	// 	return target[property] || 'default value'
// 	// },
// 	// set(target, property, value) {
// 	// 	if (property === 'age') {
// 	// 		// 检验value是不是一个int类型的
// 	// 		if (!Number.isInteger(value)) {
// 	// 			throw new TypeError(`${value} is int type`)
// 	// 		}
// 	// 	}
// 	// 	target[property] = value
// 	// }
// 	deleteProperty(target, property) {
// 		console.log('delete')
// 		delete target[property]
// 	}
// })

// //proxy.age = '10' //TypeError: 10 is int type

// proxy.age = 10
// proxy.name = 'name'
// delete proxy.age // delete

// const arr = [1, 2, 3]

// const proxy = new Proxy(arr, {
// 	set(target, property, value) {
// 		console.log('set', property, value)
// 		//set 3 20
// 		//set length 4
// 		target[proxy] = value
// 		return true
// 	}
// })

// const push = Array.prototype.push

// Array.prototype.push = function (...agvs) {
// 	return push.apply(this, agvs)
// }

// arr.push(20)

// console.log(arr) // [ 1, 2, 3, 20 ]

const obj = {
	name: 'tom'
}
// console.log(name in obj)
// console.log(Object.keys(obj))
// console.log(delete obj.name)

Reflect.has(obj, 'name')
Reflect.ownKeys(obj)
Reflect.deleteProperty(obj, 'name')

// const proxy = new Proxy(obj, {
// 	get(target, property) {
// 		console.log('watch get')
// 		return Reflect.get(target, property)
// 	}
// })

// console.log(proxy.name)
// watch get
// tom
