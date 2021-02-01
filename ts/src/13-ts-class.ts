/**
 *
 *  类的使用
 *
 */

export = {}

class Person {
	name: string
	age: number = 10
	protected gender: boolean
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
		this.gender = true
	}

	public sayHi() {
		console.log(`Hi!,${this.name}`)
	}
}

class Student extends Person {
	public readonly studentId: number
	// 只能通过静态方法创建对象
	private constructor(name: string, age: number, studentId: number) {
		super(name, age)
		this.studentId = studentId
	}

	public static create(name: string, age: number, studentId: number) {
		return new this(name, age, studentId)
	}

	public getGender() {
		// protected类型的，只能在类和子类中被访问
		this.gender ? '男' : '女'
	}
}

const s = Student.create('li', 26, 157806)

s.sayHi()
