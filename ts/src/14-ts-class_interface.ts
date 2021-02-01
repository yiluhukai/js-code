/**
 *
 *  类和接口
 *
 */
export = {}
interface Runable {
	run(): void
}

interface Eetable {
	eat(food: string): void
}

class Person implements Runable, Eetable {
	public eat(food: string) {
		console.log(`Person eat ${food}`)
	}

	public run() {
		console.log(`Person run on foot`)
	}
}

class Dog implements Runable, Eetable {
	public eat(food: string) {
		console.log(`dog eat ${food}`)
	}

	public run() {
		console.log(`dog run on foot`)
	}
}

const d = new Dog()

d.eat('meat')
d.run()
