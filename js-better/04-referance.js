/**
 *
 * 引用计数
 *
 */

const a = { name: 'a' }

const b = { name: 'b' }

const list = [a.name, b.name]

function f() {
	const a = 1
	const b = 1
}

f()

function fun() {
	const a = { name: 'a' }
	const b = { name: 'b' }
	a.b = b
	b.a = a
	return ''
}

fun()
