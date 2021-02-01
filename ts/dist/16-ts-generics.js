"use strict";
/**
 *
 *  泛型
 *
 */
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
function createAnyArray(length, value) {
    return Array(length).fill(value);
}
var numArr = createAnyArray(10, 12);
var strArr = createAnyArray(10, 'helo');
var boolArr = createAnyArray(10, false);
module.exports = {};
//# sourceMappingURL=16-ts-generics.js.map