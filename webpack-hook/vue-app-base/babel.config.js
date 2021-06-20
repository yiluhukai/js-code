/**
 *
 * @type { import('@babel/core').OptionManager }
 */

module.exports = {
	presets: [
		// '@vue/cli-plugin-babel/preset'
		[
			'@babel/preset-env',
			{
				corejs: 3,
				useBuiltIns: 'usage',
				targets: {
					chrome: '58',
					ie: '11'
				},
				modules: false
			}
		]
	]
}
