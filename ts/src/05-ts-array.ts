/**
 *
 * 数组类型
 *
 */

// 范型的方式

const arr: Array<string> = ['a', 'b']

// 第二种方式

const arr1: number[] = [1, 2, 3]

// 使用ts数组类型

function sumArr(...arr: number[]) {
	return arr.reduce((a, b) => a + b, 0)
}

console.log(sumArr(1, 2, 3))
