// const getSalary = (base, performance) => {
// 	return base + performance
// }

// getSalary(12000, 500)
// getSalary(12000, 600)

const getSalary = function (base) {
	return function (performance) {
		return base + performance
	}
}

const getSalary1 = getSalary(12000)

console.log(getSalary1(400))
console.log(getSalary1(800))
