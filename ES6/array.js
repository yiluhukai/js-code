const arr = ['124', 123, NaN]

console.log(arr.indexOf('123')) //-1
console.log(arr.indexOf('124')) //0

console.log(arr.indexOf(NaN)) // -1

console.log(arr.includes('124')) //true

console.log(arr.includes(NaN)) //true

console.log(Math.pow(2, 10)) //1024

console.log(2 ** 10) //1024

const obj = {
	name: '123',
	age: 20
}
console.log(Object.entries(obj)) //[ [ 'name', '123' ], [ 'age', 20 ] ]

for (const [key, val] of Object.entries(obj)) {
	console.log(key, val)
	//name 123
	// age 20
}

const map = new Map(Object.entries(obj))
console.log(map) //Map { 'name' => '123', 'age' => 20 }

console.log(Object.values(obj)) //['123',20]

const o = {
	firstName: 'li',
	lastName: 'jj',
	get fullName() {
		return this.firstName + this.lastName
	}
}

console.log(o) //{ firstName: 'li', lastName: 'jj', fullName: [Getter] }

let p = Object.assign({}, o) //{ firstName: 'li', lastName: 'jj', fullName: 'lijj' }
//console.log(p)
console.log(Object.getOwnPropertyDescriptors(o, 'fullName'))
// {
//     firstName: { value: 'li', writable: true, enumerable: true, configurable: true },
//     lastName: { value: 'jj', writable: true, enumerable: true, configurable: true },
//     fullName: {
//       get: [Function: get fullName],
//       set: undefined,
//       enumerable: true,
//       configurable: true
//     }
//   }

Object.defineProperties(p, Object.getOwnPropertyDescriptors(o, 'fullName')) //{ firstName: 'li', lastName: 'jj', fullName: [Getter] }

const now = new Date('1994-3-26')

const dateString = String(now.getMonth()) //'2'

const padString = dateString.padStart(2, '0') //'02'

console.log(dateString)

const f = function Fun(params, p1) {}
