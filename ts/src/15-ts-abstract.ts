/**
 *
 *   抽象类
 *
 *
 */

export = {}
abstract class Animale {
	public abstract run(): void
}

class Dog extends Animale {
	public run() {
		console.log(`dog is runing on the road`)
	}
}

const d = new Dog()

d.run()
