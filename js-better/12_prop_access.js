/***
 *
 * 避免去使用属性访问方法
 */

// 属性访问方法
function Person() {
	this.name = 'name'
	this.age = 23
	this.getAge = function () {
		return this.age
	}
}

const p = new Person()
const age = p.getAge()

// 直接访问属性
function Person1() {
	this.name = 'name'
	this.age = 23
}

const p1 = new Person1()
const age1 = p1.age
