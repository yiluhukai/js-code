/**
 *
 * 接受要转换的内容，返回转化后的内容
 *
 */
const marked = require('marked')
module.exports = source => {
	//#### Hello

	//```js
	//console.log('hello')
	//```
	const html = marked(source)
	return html
}
