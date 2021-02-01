/**
 * 对象
 *
 * @flow
 */

const o: { foo: string, bar: number } = {
	foo: 'foo',
	bar: 10
}

// 可选的属性

const obj: { foo?: string, bar: number } = {
	bar: 10
}

const obj1: { foo?: string, bar: number } = {
	bar: 10,
	foo: 'ss'
}

// 限定对应中键值对的类型

const objs: { [string]: string } = {}

objs['bar'] = 'bar'
obj.foo = '10'
