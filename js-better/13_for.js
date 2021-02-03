/**
 *
 *  for循环优化
 *
 *
 */

const arr = new Array(10).fill(11)

for (let i = 0; i < arr.length; i++) {
	console.log(arr[i])
}
// 下面两种更好
for (let i = 0, len = arr.length; i < len; i++) {
	console.log(arr[i])
}

for (let i = arr.length - 1; i >= 0; i--) {
	console.log(arr[i])
}
