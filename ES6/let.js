// if (true) {
// 	var a = 10
// }

// console.log(a) //10

// if (true) {
// 	let b = 11
// }

// console.log(b) //ReferenceError: b is not defined

// console.log(typeof a) //"undefined"

// var a = 10

// console.log(typeof b) //Cannot access 'b' before initialization

// let b = 10

// let a = 10
// let a = 11 //SyntaxError: Identifier 'a' has already been declared

// var b = 11
// let b = 20 //SyntaxError: Identifier 'a' has already been declared

// for (let i = 0; i < 2; i++) {
// 	for (let i = 0; i < 3; i++) {
// 		console.log(i) // 0 1 2 0 1 2
// 	}
// }

// const elems = [{}, {}, {}]

// for (let i = 0; i < 3; i++) {
// 	elems[i].onClick = function () {
// 		console.log(i)
// 	}
// }

// elems[0].onClick() //3

// for (let i = 0; i < 3; i++) {
// 	let i = 'hello'
// 	console.log(i) // "hello"
// }

// let i = 0

// if (i < 3) {
// 	let i = 'hello'
// 	console.log(i)
// }
// i++
// if (i < 3) {
// 	let i = 'hello'
// 	console.log(i)
// }
// i++

// if (i < 3) {
// 	let i = 'hello'
// 	console.log(i)
// }
// i++

// const a = 10

// //const  b // Missing initializer in const declaration

// a = 10

// const a = { a: 10 }
// a.a = 11

// a = {}

let i = 0
// 相当于
while (i < 3) {
	;(function (k) {
		let i = 'hello'
		console.log(i)
	})(i)
	i++
}
