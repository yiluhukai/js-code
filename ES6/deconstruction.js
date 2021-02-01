const arr = ['hello', 'world', 'baz', 'zzz']

// const [a, b, c, d = '12'] = arr

// // console.log(a, b, c) // hello', 'world', 'baz'

// // const [a, ...res] = arr

// console.log(d) //undefined

// const path = 'root/user/li'

// const [, centerStr] = path.split('/')

// console.log(centerStr) // user

// const obj = {
// 	a: 'name',
// 	b: 'hello',
// 	c: {
// 		h: 'wolrd'
// 	}
// }

// const {
// 	a: name,
// 	b: hello,
// 	c: { h: h1, g = 'zz' }
// } = obj
// console.log(name, hello, h1, g) //"name" "hello" "wolrd" "zz"

// const { a, b, c = 'world' } = obj

// console.log(a, b, c)

// const {a,...rest,b} =  arr

// console.log(rest)

const str = 'he'

const [a, b, c = 's'] = str

console.log(a, b, c) //h e
