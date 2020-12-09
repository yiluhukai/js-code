/*
    手动实现一个Promise:
    1. Promise是一个类，用来创建Promise对象
    2. Promise构造器接受一个执行器函数，执行器函数会被传入两个函数自动执行。
    3. promise对象中的有三种状态 pending,fulfilled ,rejected
       状态只能从 pending -> fulfilled ,
                pending => rejected,
				且状态进入pending之后不能再变化了 
	4. 一个promise对象可以被then()多次	
	5.  promise对象支持链式调用
		当成功或者失败回调return 一个非Promise对象时，返回的一个成功的Promise对象，且这个Promise对象的then
		回调中可以取到这个值。当返回的是一个新的Promise对象时，then()方法会返回一个全新的和当前Promise状态
		相同的Promise对象。
	6. Promise的then()返回的Promise和then()的回调返回的Promise是一个值，会报错 	
	7. then()中的参数都是可选的，当什么都不传递的时候，相当于传递了 val=>val,这样子可以传递到下一个then()中
		p.then().then(val=>{
			console.log(val)
		})
	8.promise的错误捕获，then()可以捕获执行器和前一个then()回调的错误	
	9. Promise.all()方法允许我们按照异步调用的顺序得到异步调用的结果。参数是由普通的参数和Promise组成的数组
	10. promise.finally() 接受一个函数，这个函数不论Promise进入成功还是失败状态，1.这个回调函数都会被执行，2.同时支持链式调用，3.在回调函数中还可以返回值,返回值会被转为为promise对象去执行，
	执行完成后返回一个和当前promise类似的新的Promise对象。
	const p1= new MyPromise((resolve)=>{
		setTimeout(()=>{
			reslove(10)
		},200)
	})
	const p= new MyPromise((resolve)=>{	
			reslove(100)	
	})
	p.finally(()=>{
		return p1
	}).then(val=>{
		console.log(val)
	})

	// 10 -> 200ms 后打印 100

*/

const pending = 'PENDING'
const fulfilled = 'FULFILLED'
const rejected = 'REJECTED'

//  resolve 和reject函数的默认值
const defaultCb = val => val

//  处理then()的回调函数的返回值

function resolvePromise(promise, x, resolve, reject) {
	// 处理then()返回的Promise和回调函数中返回的Promise一样的情况
	if (promise === x) {
		return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	}
	//  当时Promise对象时处理
	if (x instanceof MyPromise) {
		//  根据这个Promise的对象去设置新的Promise的状态和值
		x.then(resolve, reject)
	} else {
		resolve(x)
	}
}

class MyPromise {
	constructor(executor) {
		try {
			executor(this.resolve, this.reject)
		} catch (e) {
			this.reject(e)
		}
	}
	// 状态
	status = pending

	val = null

	reason = null

	successCall = []

	errorCall = []

	resolve = val => {
		//  保证状态只改变一次
		if (this.status !== pending) {
			return
		}
		this.val = val
		//  更新Promise的状态
		this.status = fulfilled

		//  处理异步调用resove()的情况

		while (this.successCall.length) {
			this.successCall.shift()()
		}
	}
	reject = err => {
		//  保证状态只改变一次
		if (this.status !== pending) {
			return
		}
		this.reason = err
		this.status = rejected

		//  处理异步调用 reject()的情况

		while (this.errorCall.length) {
			this.errorCall.shift()()
		}
	}
	then = (onResolve = defaultCb, onReject = defaultCb) => {
		const promise = new MyPromise((resolve, reject) => {
			// 异步去执行，当同步去执行的时候，代码中的then()的成功回调中不能去使用p2
			// const p2 = p.then(
			// 	val => {
			// 		console.log(val)
			// 		return p2
			// 	},
			// 	err => {
			// 		console.log(err)
			// 	}
			// )

			if (this.status === fulfilled) {
				setTimeout(() => {
					try {
						const x = onResolve(this.val)
						// 去解析这个全新的Promise的状态和值
						resolvePromise(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			} else if (this.status === rejected) {
				setTimeout(() => {
					try {
						const x = onReject(this.reason)
						resolvePromise(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			} else {
				// penging 状态
				this.successCall.push(() => {
					setTimeout(() => {
						try {
							const x = onResolve(this.val)
							resolvePromise(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
				this.errorCall.push(() => {
					setTimeout(() => {
						try {
							const x = onReject(this.reason)
							resolvePromise(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
			}
		})
		return promise
	}

	finally = cb => {
		return this.then(
			val => {
				return MyPromise.resolve(cb()).then(() => val)
			},
			err => {
				return MyPromise.resolve(cb()).then(() => {
					throw err
				})
			}
		)
	}

	catch = cb => {
		this.then(undefined, cb)
	}
	static all = (promiseArr = []) => {
		return new MyPromise((resolve, reject) => {
			const res = []
			let count = 0
			function addData(index, val) {
				res[index] = val
				count++
				if (count === promiseArr.length) {
					resolve(res)
				}
			}
			for (let i = 0; i < promiseArr.length; i++) {
				if (promiseArr[i] instanceof MyPromise) {
					promiseArr[i].then(val => {
						addData(i, val)
					}, reject)
				} else {
					addData(i, promiseArr[i])
				}
			}
		})
	}
	// 接受一个值，返会一个新的Promise
	static resolve(val) {
		return new MyPromise((resolve, reject) => {
			if (val instanceof MyPromise) {
				val.then(resolve, reject)
			} else if ('then' in val && typeof val.then === 'function') {
				// thenable对象
				val.then(resolve, reject)
			} else {
				resolve(val)
			}
		})
	}
}

const p = new MyPromise((resolve, reject) => {
	//console.log('start')
	// setTimeout(() => {
	//resolve('123')
	// }, 300)
	reject('err')
})

// p.then(
// 	val => {
// 		console.log(val)
// 		return new MyPromise((resolve, reject) => {
// 			//resolve('hello')
// 			//reject('error')
// 			setTimeout(() => {
// 				resolve('hello')
// 			}, 300)
// 		})
// 	},
// 	err => {
// 		console.log(err)
// 	}
// ).then(
// 	val => {
// 		console.log(val)
// 	},
// 	reason => {
// 		console.log('err=', reason)
// 	}
// )

// const p2 = p.then(
// 	val => {
// 		console.log(val)
// 		return p2
// 	},
// 	err => {
// 		console.log(err)
// 	}
// )
// p2.then(
// 	val => {
// 		console.log(val)
// 	},
// 	reason => {
// 		console.log(reason.message)
// 	}
// )

// p.then(val => {
// 	throw new Error('custom error')
// }).then(
// 	val => {
// 		console.log(val)
// 	},
// 	err => {
// 		console.log(err)
// 	}
// )

MyPromise.all(['a', 'b', p]).then(
	val => {
		console.log(val)
	},
	err => {
		console.log(err)
	}
)

MyPromise.resolve(MyPromise.resolve(10)).then(val => {
	console.log(val)
})

p.finally(() => {
	return new MyPromise((resolve, reject) => {
		setTimeout(() => {
			resolve(1000)
		}, 2000)
	})
}).then(undefined, reason => {
	console.log(reason)
})

p.catch(err => {
	console.log(err)
})

// const p = new Promise((resolve, reject) => {
// 	//console.log('start')
// 	// setTimeout(() => {
// 	//resolve('123')
// 	// }, 300)
// 	reject('err')
// })

// Promise.all(['a', 'b', p]).then(
// 	val => {
// 		console.log(val)
// 	},
// 	err => {
// 		console.log(err)
// 	}
// )

// Promise.resolve(MyPromise.resolve(10)).then(val => {
// 	console.log(val)
// })

// p.finally(() => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(1000)
// 		}, 2000)
// 	})
// }).then(undefined, reason => {
// 	console.log(reason)
// })

//  处理thenable 对象

const thenable = {
	then(resolve, reject) {
		resolve('hello12')
	}
}

const p2 = MyPromise.resolve(thenable)

p2.then(
	val => {
		console.log(val)
	},
	err => {
		console.log(err)
	}
)
