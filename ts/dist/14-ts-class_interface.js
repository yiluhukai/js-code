"use strict";
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.eat = function (food) {
        console.log("Person eat " + food);
    };
    Person.prototype.run = function () {
        console.log("Person run on foot");
    };
    return Person;
}());
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.eat = function (food) {
        console.log("dog eat " + food);
    };
    Dog.prototype.run = function () {
        console.log("dog run on foot");
    };
    return Dog;
}());
var d = new Dog();
d.eat('meat');
d.run();
module.exports = {};
//# sourceMappingURL=14-ts-class_interface.js.map