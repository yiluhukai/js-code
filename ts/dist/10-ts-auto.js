"use strict";
/**
 *
 *  类型推断
 *
 */
var a = 'string'; // let a:string="string"
//Type '100' is not assignable to type 'string'
// a = 100
var o; // let o:any = undfined
o = 100;
o = {};
module.exports = {};
// 不推荐使用any类型，不利于后期代码维护
//# sourceMappingURL=10-ts-auto.js.map