/***
 *
 * gulp的入口文件
 *
 */

// exports.foo = function (done) {
// 	console.log('foo')
// 	done()
// }

// exports.default = function (done) {
// 	console.log('default task')
// 	done()
// }

// // gulp4.0之前注册任务

// const gulp = require('gulp')

// gulp.task('baz', function (done) {
// 	console.log('baz')
// 	done()
// })

/***
 *
 *
 * 创建组合任务
 */

// const { series, parallel } = require('gulp')

// function foo(done) {
// 	console.log('foo task')
// 	done()
// }

// function baz(done) {
// 	console.log('foo task')
// 	done()
// }
// // 串行任务
// exports.task1 = series(foo, baz)

// exports.task2 = parallel(foo, baz)

/**
 *
 * gulp的异步任务
 *
 */
const fs = require('fs')
exports.callback = function (done) {
	console.log('done task')
	done()
}

exports.callback_error = function (done) {
	console.log('done task')
	done(new Error('task failed'))
}

exports.promise = function () {
	console.log('promise task')
	//  传递的值会被忽略
	return Promise.resolve('helo')
}

exports.promise_error = function () {
	console.log('promise task')
	//  传递的值会被忽略
	return Promise.reject(new Error('task failed'))
}

exports.await = async function () {
	console.log('await done')
	await Promise.resolve()
}

exports.stream = function () {
	const readStream = fs.createReadStream('package.json')
	const writeStream = fs.createWriteStream('temp.txt')
	readStream.pipe(writeStream)
	return readStream
}

exports.stream = function (done) {
	const readStream = fs.createReadStream('package.json')
	const writeStream = fs.createWriteStream('temp.txt')
	readStream.pipe(writeStream)
	readStream.on('end', function () {
		done()
	})
}
