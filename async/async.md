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

#### Promise 的错误处理

-   then 方法的第二个方法可以捕获 Promise 的异常（1.reject(err),2 创建 Promise 的执行器函数的抛出的错误）

```js

const ajax = function (url) {
	return new Promise(function (resolve, reject) {
		// 一般是代码的逻辑有问题导致的
		throw new Error('coustom error')
		const xhr = new XMLHttpRequest()
		//  初始化请求的信息
		xhr.open('get', url)
		//  设置响应体的类型

		xhr.responseText = 'json'
		xhr.onload = function () {
			//  监听xhr的状态和响应状态
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(JSON.parse(xhr.response))
			} else {
				reject(new Error(xhr.responseText))
			}
		}
		// 发送请求
		xhr.send()
	})


ajax('/api/url1').then(
	res => {
		console.log(res)
	},
	err => {
		console.log(1, err)
	}
)
```

-   使用 catch()也可以捕获 Promise 的异常

```


ajax('/api/url1')
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})

```

-   两种捕获异常的区别是，then()只能捕获前一个 Promise 的异常，使用第二种方式，可以捕获 then()方法中回掉函数跑出了的错误。

```js
ajax('/api/employees')
	.then(res => {
		console.log(re)
	})
	.catch(err => {
		console.log(err) //  re 未定义
	})
```

-   全局异常捕获(不建议，建议在对每个 Promise 都做异常处理)
    -   浏览器环境

```js
const ajax = require('./01_Promise.js')

window.addEventListener('unhandledrejection', e => {
	const { reason, promise } = e
	//  reason 是一个错误对象 ，Promise是对应的promise
	console.log(reason, promise)
})

ajax('/api/employees').then(res => {
	console.log(re)
})
```

    -	node环境

```js
process.on('unhandledrejection', (reason, promise) => {
	console.log(reason, promise)
})
```

#### Promise 的静态方法

-   Promise.resolve() 返回一个 Promise
    -   Promise.resolve()的参数是一个 Promise 对象，会返回这个 Promise 对象
    -   Promise.resolve()的参数是一个 thenable 对象（有 then 方法的对象）,会将这个 then 方法第一个函数的参数返回,可以用来将第三方的 Promise 兑现转化为标准的 Promise 对象
    -   Promise.resolve()的参数是其他类型的参数，会返回一个成功状态的 Promise,在对应的回掉函数中可以取到这个参数

```js
const p2 = Promise.resolve(p1)

console.log(p1 === p2) //true

const thenableObj = {
	then: function (resove, reject) {
		resove(111)
	}
}

Promise.resolve(thenableObj).then(val => {
	console.log(val) //111
})
```

-   Promise.reject() 返回一个失败状态的 Promise,传入的参数可以在 catch()中取到，传入什么，catch 中取到什么

```js
const p1 = Promise.reject(10).catch(val => {
	console.log(val) //10
})

const p2 = Promise.reject(p1)

console.log(p1 === p2) //false

const thenableObj = {
	then: function (resove, reject) {
		resove(111)
	}
}

Promise.reject(thenableObj).then(val => {
	console.log(val) // thenableObj
})
```

-   Promise.all([]) 接受一个 Promise 数组，等待所有的 Promise 都进入成功状态，才返回一个成功状态的 Promise.一个进入状态就返回失败状态的 Promise.成功时会返回的 Promise 的成功回调的参数数组中每一个 Promise 成功回调的参数

```js
Promise.all('/api/urls')
	.then(urls => {
		return Promise.all(urls.map(urls => ajax(urls)))
	})
	.then(values => {
		coonsole.log(values)
	})
```

-   Promise.race([]) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

```js
//  实现一个待请求超时的ajax
const ajax = require('./01_Promise.js')
const timeOut = new Promise(function (resove, reject) {
	setTimeout(() => {
		reject(new Error('超时'))
	}, 500)
})

//const getUrl = ajax('/api/urls')

const request = function (url) {
	return Promise.race([ajax(url), timeOut])
}
// chrome 的network中可以设置请求的网速，当网速比较慢的时候就会出现超时的情况
request('/api/employees')
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})
```

#### 宏任务和微任务

-   宏任务：同步执行的任务和回调队列中的任务

-   微任务：Promise 对象 then 方法的回调，MutationObserver 对象，还有 node 中的 process.nextTick()的回调，微任务是宏任务执行时添加的额外需求。

-   微任务的出现可以提高整体的响应能力

eg:银行排队取钱，到你的时候你在取钱的完成后可以顺便办理一张信用卡，而不是去重新排队，这样子整体的时间就比较短

js 主线程在执行时会将一些异步任务的回调放到回调队列中做为宏任务，宏任务需要等待本轮执行结束才能开始执行，同时宏任务在执行的时候可能产生微任务，微任务会在本轮事件循环结束立即执行。

```js
console.log('globle')

//  宏任务
setTimeout(() => {
	console.log('setTimeout')
})

// 微任务
process.nextTick(() => {
	console.log('nextTick')
})

console.log('hello')

//globle
//hello
//nextTick
//setTimeout
```

#### async/await

-   async 的原理是生成器和迭代器
-   生成器是一个特殊的函数，可以返回一个迭代器对象，同时生成器中 yield 关键字可以让出线程的执行权
-   迭代器是一个可迭代的对象，可以使用 next 和 throw 方法向生成器内部穿值，next 方法配合 done 属性可以把线程的执行权交给生成器函数。

```js
//  生成器函数

function* gen() {
	console.log('start') // 1: 'start'
	const res = yield Promise.resolve(10)
	console.log('first', res) // 4: 124

	const res1 = yield Promise.resolve(111)

	console.log('second', res1) // 6: 125
}

//  返回一个可迭代的对象

const iterator = gen()

// 开始执行
const p1 = iterator.next()

console.log(p1) // 2 : { value: Promise { 10 }, done: false }
p1.value.then(val => {
	console.log(val) // 3 :  10
	if (!p1.done) {
		const p2 = iterator.next('124')
		p2.value.then(val => {
			console.log(val) //  5: 111
			if (!p2.done) {
				const p3 = iterator.next('125') //
				console.log(p3) // 7:{ value: undefined, done: true }
			}
		})
	}
})
```

-   使用 iterator 的 throw 方法向生成器传入一个错误

```js
function* gen() {
	console.log('start')

	try {
		yield 2
	} catch (e) {
		console.log(e)
	}
}

const it = gen()

it.next()

it.throw(new Error('123'))

// start
// Error: 123
//   at Object.<anonymous> (/Users/lijunjie/js-code/async/09_iterator.js:17:10)
```

我们可以封装一个执行器函数去执行自动调用 next()。

```js
function* gen() {
	try {
		console.log('start')
		const res = yield Promise.resolve('123')
		console.log(res) // 123
		const res1 = yield Promise.reject(new Error('custom error'))
		console.log(res1)
	} catch (e) {
		console.log('handle error', e)
	}
}

function co(gen) {
	const it = gen()

	function next(val) {
		if (val.done) {
			return
		}
		val.value.then(
			val => {
				v = it.next(val)
				next(v)
			},
			err => {
				it.throw(err)
			}
		)
	}

	next(it.next()) //  开始执行代码
}

co(gen)
```

-   后来语言本身添加了对生成器函数的调用，我们不需要去自己实现 co 函数了。async 函数会返回一个

```js
async function gen() {
	try {
		console.log('start')
		const res = await Promise.resolve('123')
		console.log(res) // 123
		//const res1 = await Promise.reject(new Error('custom error'))
		const res1 = await Promise.resolve(10)
		console.log(res1)

		return 2
	} catch (e) {
		console.log('handle error', e)
	}
}

const res = gen()

console.log(res)

res.then(result => {
	console.log('completed', result)
})

// start
// Promise { <pending> }
// 123
// 10
// completed 2
```
