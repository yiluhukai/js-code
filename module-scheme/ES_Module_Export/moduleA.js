var name = 'hello'

var age = 12

function SayHello() {}

class Person {}

//export { name, SayHello as sayHello, Person as default }

// export default name
export { name, SayHello }

export default age
setTimeout(() => {
	name = 'baz'
	age = 15
}, 1000)
