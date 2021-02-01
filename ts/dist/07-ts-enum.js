"use strict";
/**
 *
 * 枚举类型
 *
 */
// 使用对象
// const postStatus = {
// 	Draft: 0,
// 	UnPublished: 1,
// 	Published: 2
// }
var post = {
    title: 'foo',
    content: 'foo...',
    status: 0 /* Draft */ //0
};
var statuses;
(function (statuses) {
    statuses[statuses["closed"] = 1] = "closed";
    statuses[statuses["opened"] = 2] = "opened"; //2
})(statuses || (statuses = {}));
var others;
(function (others) {
    others["others"] = "other";
    others["math"] = "math";
})(others || (others = {}));
statuses.closed;
others.math;
//# sourceMappingURL=07-ts-enum.js.map