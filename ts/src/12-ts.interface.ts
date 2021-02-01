/**
 *
 *  接口：用来约束对象的成员
 *
 */

export = {}

interface person {
	name: string
	age: number
}

function foo(o: person) {
	console.log(o.name, o.age)
}

interface Post {
	title: string
	content: string
	subTitle?: string
	readonly author: string
}

const p: Post = {
	title: 'ts',
	content: 'ts is ....',
	subTitle: '',
	author: 'yluhuakai'
}
// Cannot assign to 'author' because it is a read-only property.ts(2540)
//p.author = ''

interface Caches {
	[prop: string]: string
}

const cache: Caches = {
	name: ''
}
