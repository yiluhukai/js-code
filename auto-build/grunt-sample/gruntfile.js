/**
 *
 * gruntfile.js是grunt的入口文件，让我们定义一些自动化任务
 * 需要导出一个函数，函数接受grunt作为形参，里面提供了一些构建任务可以用的api
 *
 */

module.exports = function (grunt) {
	/*
	// 定义一个简单的任务
	// 第一个参数是任务的名称
	// npx grunt bar
	grunt.registerTask('foo', function () {
		console.log('hello')
	})
	//第二个参数是一个任务描述
	grunt.registerTask('baz', 'this is task', function () {
		console.log('hello')
	})
	// bad任务返回false告诉grunt任务失败，接受后续的任务继续执行
	grunt.registerTask('bad', 'this is task', function () {
		console.log('hello')
		return false
	})

	// 定义一个默认任务
	//  npx grunt
	// grunt.registerTask('default', function () {
	// 	console.log('this is default task')
	// })

	// 使用默认任务去串联其他的任务

	grunt.registerTask('default', ['foo', 'bad', 'baz'])

	// 异步任务
	// grunt的任务默认是同步执行的，所以不会执行console.log
	grunt.registerTask('async-task', function () {
		setTimeout(() => {
			console.log('async task')
		}, 1000)
	})

	// 想要执行异步的任务，需要使用this.async获取一个函数，执行这个函数grunt才回去结束任务
	grunt.registerTask('async-task', function () {
		const done = this.async()
		setTimeout(() => {
			console.log('async task')
			done()
		}, 1000)
	})

	// 异步使用done(false)来告知grunt任务执行失败
	grunt.registerTask('async-bad-task', function () {
		const done = this.async()
		setTimeout(() => {
			console.log('async task')
			done(false)
		}, 1000)
	})
	*/
	/** 
	 * 
	 * 添加配置选项
	 * 
	 * 
	 * /
	// grunt.initConfig({
	// 	// foo在这里代表的是任务名
	// 	foo: {
	// 		baz: 123
	// 	}
	// })
	// grunt.registerTask('foo', function () {
	// 	console.log(grunt.config('foo.baz')) //123
	// 	console.log(grunt.config('foo').baz) //123
	// })
	/**
	 *
	 * 多目标模式任务
	 */

	grunt.initConfig({
		build: {
			// build任务的选项
			options: {
				top: 'top'
			},
			css: {
				options: {
					baz: 'baz'
				}
			},
			js: 1
		}
	})
	grunt.registerMultiTask('build', function () {
		console.log(this.options())
		console.log(`target:${this.target},data:${this.data}`)
	})
}
