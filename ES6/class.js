/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2020-12-23 23:17:22
 * @LastEditTime: 2020-12-23 23:35:33
 * @FilePath: /js-code/ES6/class.js
 */

// function Person(name) {
// 	this.name = name
// }

// Person.prototype.say = function () {
// 	console.log(`hello,${this.name}`)
// }

class Person {
	constructor(name) {
		this.name = name
	}

	say() {
		console.log(`hello,${this.name}`)
	}
	static create(name) {
		return new this(name)
		//return new Perosn(name)
	}
}

class Student extends Person {
	constructor(name, age) {
		//  调用父类的构造函数
		super(name)
		this.age = age
	}

	say() {
		// 调用父类的方法
		super.say()
		console.log('this is student')
	}
}

const s = new Student('tom', 26)

s.say()

// hello,tom
// this is student
