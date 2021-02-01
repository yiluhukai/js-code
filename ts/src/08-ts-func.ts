/**
 *
 *  函数类型
 *
 */
export = {}
// 可选参数
function Hello(a: number, b?: number): string {
	return 'hello'
}

Hello(1)

Hello(2)

// 默认值参数
function Hello1(a: number, b: number = 100): string {
	return 'hello'
}

Hello1(1)

Hello1(1, 100)

// 剩余参数

function Hello2(...arg: number[]): string {
	return 'hello'
}

//  函数字面量
// 可以类型推断出来变量f的类型
const f = function (a: number): string {
	return 'f'
}
//限定形参的类型
function res(callback: (a: number) => string): string {
	return callback(10)
}
