const curry = function (func) {
	return function curried(...arg) {
		// 传入的参数不够
		if (arg.length < func.length) {
			return function () {
				// 将参数合并继续返回curry后的结果
				return curried(...arg.concat(Array.from(arguments)))
			}
		} else {
			return func(...arg)
		}
	}
}

function getSum(a, b, c) {
	return a + b + c
}

const curried = curry(getSum)

console.log(curried(1, 2, 3))

console.log(curried(1)(2)(3))

console.log(curried(1, 2)(3))
