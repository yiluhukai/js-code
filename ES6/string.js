// const str = `hello "world"  \`zz\``

// console.log(str) // hello "world"  `zz`

// const name = 'lilei'
//const str = console.log`hello world,${name}sss${1 + 3}` //[ 'hello world,', 'sss', '' ] lilei 4

function myTagFunc(strings, name, sum) {
	// 自定义一些逻辑
	let sumStr = ''
	if (sum > 3) {
		sumStr = 3
	}
	console.log(strings[0] + name + strings[1] + sumStr + strings[2]) //h2,lileiss3
	return '123'
}

const name = 'lilei'

const res = myTagFunc`h2,${name}ss${1 + 3}`

console.log(res) //123

function tag(strings) {
	console.log(strings.raw[0]) // 'string text line 1 \n string text line 2 '
	console.log(strings[0])
	// 不在一行
	//string text line 1
	//string text line
}

tag`string text line 1 \n string text line 2 ${name}`

const str = 'hello world'

console.log(str.endsWith('ld')) //true

console.log(str.startsWith('he')) // true

console.log(str.includes('hello')) //true

console.log(str.indexOf('we')) // -1
