const sy = Symbol()

const sy1 = Symbol()

const obj = {
	[sy]: 'name1',
	[sy1]: 'symbol'
}

console.log(obj) //{ [Symbol()]: 'name1', [Symbol()]: 'symbol' }

let o = (function () {
	const _name = Symbol('_name')
	return {
		[_name]: 'tim cat',
		set name(val) {
			this[_name] = val
		},
		get name() {
			return this[_name]
		}
	}
})()

console.log(o) //{ name: [Getter/Setter], [Symbol(_name)]: 'tim cat' }

console.log(o.name) //"tim cat"

for (const key in o) {
	console.log(key) // "name"
}

console.log(Object.keys(o)) //[ 'name' ]
