/**
 *
 * 减少作用域链的查找
 *
 */

var name = 'foo'

function foo() {
	name = 'baz'
	function baz() {
		var age = 27
		console.log(age, name)
	}
	baz()
}
foo()

// 作用链的查找更少
var name = 'foo'

function foo() {
	var name = 'baz'
	function baz() {
		var age = 27
		console.log(age, name)
	}
	baz()
}
foo()
