/**
 * plop的入口文件，需要导出一个函数
 * 函数执行的时候时会传入plop对象，用于创建生成器任务
 */

module.exports = plop => {
	/**
	 * 第一个参数时生成器的名字
	 * 第二个参数用于描述生成器的对象
	 */
	plop.setGenerator('component', {
		description: 'create a react component',
		// 创建过程中的询问环节
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'component name',
				default: 'MyComponent'
			}
		],

		actions: [
			{
				// 生成模版环节
				type: 'add',
				// name 来自上面的答案,使用hbs的模版引擎
				path: 'src/components/{{name}}/{{name}}.js',
				templateFile: 'plop-templates/component.js.hbs'
			},
			{
				// 生成模版环节
				type: 'add',
				// name 来自上面的答案,使用hbs的模版引擎
				path: 'src/components/{{name}}/{{name}}.css',
				templateFile: 'plop-templates/component.css.hbs'
			},
			{
				// 生成模版环节
				type: 'add',
				// name 来自上面的答案,使用hbs的模版引擎
				path: 'src/components/{{name}}/{{name}}.test.js',
				templateFile: 'plop-templates/component.test.js.hbs'
			}
		]
	})
}
