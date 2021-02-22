const Generator = require('yeoman-generator')

module.exports = class extends Generator {
	// 接受用户的输入
	prompting() {
		return this.prompt({
			type: 'input',
			name: 'name',
			massage: 'please input your name of project',
			default: 'vue-demo'
		}).then(answer => {
			//answer ={ name:'your input'}
			this.answer = answer
		})
	}
	writing() {
		const templates = [
			'build/index.js',
			'public/favicon.ico',
			'public/index.html',
			'src/App.vue',
			'src/main.js',
			'babel.config.js',
			'jsconfig.json',
			'package-lock.json',
			'package.json',
			'postcss.config.js',
			'vue.config.js',
			'README.md'
		]

		templates.forEach(item => {
			this.fs.copyTpl(this.templatePath(item), this.destinationPath(item), this.answer)
		})
	}
}
