/**
 *
 *  类型断言：有时候TS无法去类型推到出变量的具体类型，而开发者可以明确知道变量的类型的，这个时候我们可以使用类型断言
 *
 */

export = {}

const arr = [1, -2, 10]
// 编辑器会推到成const res:number|undefined
const res = arr.find(item => item > 0)

// 我们根据数组知道肯定不会返回undefined

// Object is possibly 'undefined'.
// const sum = res + res

// 使用类型断言

const sum = (res as number) + (res as number)

// 另一种方式

const sum1 = <number>res + <number>res
