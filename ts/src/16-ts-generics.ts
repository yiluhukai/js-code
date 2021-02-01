/**
 *
 *  泛型
 *
 */

export = {}

// // 创建数字数组
// function createArrayNumber(length: number, value: number): number[] {
// 	return Array<number>(length).fill(value)
// }

// // 创建字符串数组

// function createArrayString(length: number, value: string): string[] {
// 	return Array<string>(length).fill(value)
// }

// const numArr = createArrayNumber(10, 12)

// const strArr = createArrayString(10, 'helo')

// 创建任意类型的数组并填充

function createAnyArray<T>(length: number, value: T): T[] {
	return Array<T>(length).fill(value)
}

const numArr = createAnyArray(10, 12)

const strArr = createAnyArray(10, 'helo')

const boolArr = createAnyArray<boolean>(10, false)
