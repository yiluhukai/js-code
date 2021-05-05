module.exports = {
	env: {
		browser: false,
		es6: true
	},
	extends: ['standard'],
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: 'script'
	},
	rules: {
		'no-alert': 'error'
	},
	globals: {
		jQuery: 'readonly'
	}
}
