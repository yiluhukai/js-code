/**
 * yeoman-generator中导出一个生成器的基类，基类中提供了生命周期函数和一些方法
 *
 */

const Generator = require('yeoman-generator')
module.exports = class extends Generator {
	prompting() {
		// 创建模版时提问
		//https://github.com/SBoudrias/Inquirer.js/blob/master/README.md
		return this.prompt({
			type: 'input',
			name: 'name',
			message: 'Please input your file name!',
			default: 'project'
		}).then(answer => {
			//answer = { name: 'val' }
			this.answer = answer
		})
	}
	writing() {
		//生成文件阶段调用此方法
		// 向项目的目录中写入文件
		// wirte方法接受两个参数：一个生成的文件的绝对路径，一个文件的内容
		//this.fs.write(this.destinationPath('temp.txt'), Math.random().toString())
		// 模版文件的路径
		// const temp = this.templatePath('foo.txt')
		// // 输出目标的路径
		// const output = this.destinationPath('foo.txt')
		// //模版数据上下文
		// const contents = { title: 'foo.txt', success: true }
		// this.fs.copyTpl(temp, output, contents)

		const temp = this.templatePath('bar.html')
		// 输出目标的路径
		const output = this.destinationPath('bar.html')
		//模版数据上下文
		const contents = this.answer
		this.fs.copyTpl(temp, output, contents)
	}
}
