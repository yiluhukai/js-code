"use strict";
/**
 *
 * 数组类型
 *
 */
// 范型的方式
var arr = ['a', 'b'];
// 第二种方式
var arr1 = [1, 2, 3];
// 使用ts数组类型
function sumArr() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    return arr.reduce(function (a, b) { return a + b; }, 0);
}
console.log(sumArr(1, 2, 3));
//# sourceMappingURL=05-ts-array.js.map