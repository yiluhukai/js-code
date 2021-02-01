"use strict";
function stringfy(obj) {
    //  JSON.stringify的第一个参数就是any类型的
    return JSON.stringify(obj);
}
stringfy('hello');
stringfy(100);
var obj = {};
// 语法上不会报错，所以any类型不是类型安全的
obj.hello();
module.exports = {};
//# sourceMappingURL=09-ts-any.js.map