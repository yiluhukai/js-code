const { Tapable } = require('tapable')
// 需要手动安装依赖
// webpac中使用的并不是 babylon
const babylon = require('babylon')
class Parser extends Tapable {
	parse(source) {
		return babylon.parse(source, {
			// parse in strict mode and allow module declarations
			sourceType: 'module',
			plugins: [
				// enable import() syntax
				'dynamicImport'
			]
		})
	}
}

module.exports = Parser
