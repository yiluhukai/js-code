interface People {
	name: string
	age: number
	gender: 'female' | 'male'
}

const p: People = { name: 'sss', age: 20, gender: 'female' }

for (const [key, value] of Object.entries(p)) {
	console.log(key, value)
}
