/**
 *
 * 使用gulp来压缩css文件
 *
 */
// const fs = require('fs')
// const { Transform } = require('stream')
// exports.miniCss = function () {
// 	// 读取css文件

// 	const read = fs.createReadStream('./normalize.css')

// 	//创建一个转换流对流的内容做修改

// 	const myTransform = new Transform({
// 		transform(chunk, encoding, callback) {
// 			// 对流的内容做修改
// 			const output = chunk
// 				.toString()
// 				.replace(/\s+/g, '')
// 				.replace(/\/\*.+?\*\//g, '')
// 			callback(null, output)
// 		}
// 	})

// 	const write = fs.createWriteStream('./normalize.min.css')
// 	read.pipe(myTransform).pipe(write)
// 	return read
// }

/**
 *
 * 使用gulp提供的文件相关的api
 *
 */

const { src, dest } = require('gulp')
const clean = require('gulp-clean-css')
const rename = require('gulp-rename')
exports.miniCss = function () {
	//clean是一个转换流，用于css的压缩
	// rename也是一个转换流，用于修改文件名(文件的元信息)
	return src('./normalize.css')
		.pipe(clean())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('dist'))
}
