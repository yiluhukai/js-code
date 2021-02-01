"use strict";
/**
 *
 *  类型断言：有时候TS无法去类型推到出变量的具体类型，而开发者可以明确知道变量的类型的，这个时候我们可以使用类型断言
 *
 */
var arr = [1, -2, 10];
// 编辑器会推到成const res:number|undefined
var res = arr.find(function (item) { return item > 0; });
// 我们根据数组知道肯定不会返回undefined
// Object is possibly 'undefined'.
// const sum = res + res
// 使用类型断言
var sum = res + res;
// 另一种方式
var sum1 = res + res;
module.exports = {};
//# sourceMappingURL=11-ts-assets.js.map