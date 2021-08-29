"use strict";
// 函数的重载
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
// 实现
function add(a, b) {
    if (typeof b === 'number') {
        return a + b;
    }
    else if (typeof b === 'string') {
        return a + b;
    }
}
exports.add = add;
//# sourceMappingURL=18-ts-overload.js.map