/**
 *
 * 最优的for循环
 *
 */

const arr = new Array(10).fill(1)

// forEach  最快

arr.forEach(item => {
	console.log(item)
})

// 普通的for循环 中间

for (let i = arr.length - 1; i >= 0; i--) {
	console.log(arr[i])
}

// for-in  最慢

for (let key in arr) {
	console.log(arr[key])
}
