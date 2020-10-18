//  函数作为参数

function forEach(arr, func) {
	for (let i = 0; i < arr.length; i++) {
		func(arr[i])
	}
}

// test

const arr = [1, 2, 3, 4, 5]

forEach(arr, ele => {
	console.log(ele)
})

function filter(arr, func) {
	const res = []
	for (let i = 0; i < arr.length; i++) {
		if (func(arr[i])) {
			res.push(arr[i])
		}
	}
	return res
}

const res = filter(arr, ele => ele % 2 == 0)
console.log(res)

// map

const map = (arr, func) => {
	const res = []
	for (const item of arr) {
		res.push(func(item))
	}
	return res
}

// test

console.log(map(arr, ele => ele * 2))

// some

const some = function some(arr, func) {
	let flag = false
	for (const item of arr) {
		if (func(item)) {
			flag = true
			break
		}
	}
	return flag
}
console.log(some(arr, ele => ele === 4))

// every

const every = (arr, func) => {
	let flag = true
	for (const item of arr) {
		if (!func(item)) {
			flag = false
			break
		}
	}

	return flag
}

console.log(every(arr, ele => ele < 4))

// find

const find = (arr, func) => {
	for (const item of arr) {
		if (func(item)) {
			return item
		}
	}
	return
}

//

console.log(find(arr, item => item === 4))
console.log(find(arr, item => item === 10))
