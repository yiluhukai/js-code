// 使用Promise封装一个ajax请求

const ajax = function (url) {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest()
		//  初始化请求的信息
		xhr.open('get', url)
		//  设置响应体的类型

		xhr.responseText = 'json'
		xhr.onload = function () {
			//  监听xhr的状态和响应状态
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.response)
			}
		}
		// 发送请求
		xhr.send()
	})
}

module.exports = ajax
