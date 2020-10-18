//  只有两个参数的函数组合

function compose(f, g) {
	return function (value) {
		return f(g(value))
	}
}

// 获取数组的最后一个元素并转化为大写

const reverse = arr => arr.reverse()

const first = arr => arr[0]

const getLast = compose(first, reverse)

console.log(getLast([1, 2, 3]))
