// function sum(a, b) {
// 	a = a === void 0 ? 10 : a
// 	return a + b
// }

// console.log(sum(undefined, 3)) // 13
// console.log(sum(0, 3)) //3

// function restArg(...args) {
// 	console.log(args) //[ 1, 2, 4, 5 ]
// }

// restArg(1, 2, 4, 5)

// function MyConsole(a, b, c, d) {
// 	console.log(a, b, c, d)
// }

// MyConsole(...[1, 2, 3, 4])

const a = function () {
	return 10
}
// 等价于

const b = n => n + 1

const cb = c => ({
	c
})

const arr = [1, 2, 3]

const res = arr.map(function (item) {
	return item + 1
})

console.log(res) // [2,3,4]

const r = arr.map(item => item + 1)

console.log(res) //[(2, 3, 4)]

const obj = {
	name: 'tom',
	getName: function () {
		console.log(this.name)
	},
	get_name: () => {
		console.log(this.name)
	},
	getNameAfter20: function () {
		const _self = this
		setTimeout(function () {
			console.log(_self.name)
		}, 20)
	},
	get_name_after20: function () {
		setTimeout(() => {
			console.log(this.name)
		}, 20)
	}
}

obj.getName() //'tom'
obj.get_name() //undefined

obj.getNameAfter20() //'tom'

obj.get_name_after20() //'tom'

cons
