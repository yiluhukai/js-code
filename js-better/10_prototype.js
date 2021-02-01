/**
 *
 * 原型上添加方法
 */

function Foo() {}

Foo.prototype.SayHello = function () {
	console.log('hello world')
}

const f1 = new Foo()

// 构造函数内部添加

function Foo1() {
	this.SayHello = function () {
		console.log('hello world')
	}
}

const f2 = new Foo1()
