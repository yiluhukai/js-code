"use strict";
// 可选参数
function Hello(a, b) {
    return 'hello';
}
Hello(1);
Hello(2);
// 默认值参数
function Hello1(a, b) {
    if (b === void 0) { b = 100; }
    return 'hello';
}
Hello1(1);
Hello1(1, 100);
// 剩余参数
function Hello2() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 'hello';
}
//  函数字面量
// 可以类型推断出来变量f的类型
var f = function (a) {
    return 'f';
};
//限定形参的类型
function res(callback) {
    return callback(10);
}
module.exports = {};
//# sourceMappingURL=08-ts-func.js.map