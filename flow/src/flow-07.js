/**
 * 函数类型
 *
 * @flow
 */

function foo(callback: (number, string) => void) {
	callback(10, 'a')
}

foo(function (n, str) {
	// n => number
	// str=> string
})
