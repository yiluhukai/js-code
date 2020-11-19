#### Promise

-   Promise 对象是一个用来处理异步的对象

#### 封装一个 ajax 请求的代码

```js
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
			} else {
				reject(new Error(xhr.responseText))
			}
		}
		// 发送请求
		xhr.send()
	})
}
```

#### 调用

```js
ajax('/api/employees')
	.then(res => {
		console.log(res)
	})
	.then(() => {
		return 12
	})
	.then(val => {
		console.log(val)
	})
```

#### promise 的使用误区

-   promise 是一种异步处理方案，主要为了解决回掉地狱的问题，支持链式调用

-   错误用法

```js
ajax('/api/employees').then(res => {
	ajax(res.url).then(res => {
		ajax(res.url).then(res => {
			console.log(res)
		})
	})
})
```

-   正确的用法

```js
ajax('/api/url')
	.then(res => {
		return ajax(res.url)
	})
	.then(res => {
		return ajax(res.url)
	})
	.then(res => {
		console.log(res)
	})
```

#### Promise 的特性

-   Promise 的 then()方法会返回一个全新的 Promise

```js
const p1 = ajax('/api/url')
const p2 = p1.then(res => {
	console.log(res)
})
p2 === p1 // => false
```

-   后的 then()方法就是为上一个 Promise 注册回调

-   前面 then()中的回调函数的返回值会作为后面 then()中回调的参数

```js
const p1 = ajax('/api/url')
	.then(() => {
		return 2
	})
	.then(value => console.log(value)) // 2
```

-   当前一个 then()的回调返回一个 Promise 时，then 就是对这个 Promise 注册回调

```js
let p1 = null

const p2 = ajax('/api/url').then(res => {
	p1 = ajax(res.url)

	console.log(p1)
	return ajax(res.url)
})

p2.then(() => {
	console.log(p1, p2)
	console.log(p1 === p2) // false
})
```
