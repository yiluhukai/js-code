"use strict";
/**
 *
 *  类的使用
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.age = 10;
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    Person.prototype.sayHi = function () {
        console.log("Hi!," + this.name);
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // 只能通过静态方法创建对象
    function Student(name, age, studentId) {
        var _this = _super.call(this, name, age) || this;
        _this.studentId = studentId;
        return _this;
    }
    Student.create = function (name, age, studentId) {
        return new this(name, age, studentId);
    };
    Student.prototype.getGender = function () {
        // protected类型的，只能在类和子类中被访问
        this.gender ? '男' : '女';
    };
    return Student;
}(Person));
var s = Student.create('li', 26, 157806);
s.sayHi();
module.exports = {};
//# sourceMappingURL=13-ts-class.js.map