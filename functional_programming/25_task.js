const { task } = require('folktale/concurrency/task')
const { split, find } = require('lodash/fp')
const fs = require('fs')

//  处理异步任务,返回task函子

function readFile(fileName) {
	return task(resolver => {
		fs.readFile(fileName, 'utf-8', (err, data) => {
			if (err) {
				return resolver.reject(err)
			}
			resolver.resolve(data)
		})
	})
}

// 调用
//  run 执行函子
//  listen()监听异步任务执行的事件

//  将文件读取的结果保存到函子中，通过map方法传入函数去处理数据

readFile('../package.json')
	.map(split('\n'))
	.map(find(x => x.includes('version')))
	.run()
	.listen({
		onRejected: err => {
			console.log(err)
		},
		onResolved: value => {
			console.log(value)
		}
	})
