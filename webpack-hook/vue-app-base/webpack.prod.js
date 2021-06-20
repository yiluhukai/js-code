const commonConfigs = require('./webpack.common')
const { merge } = require('webpack-merge')
/**
 *
 * @type {import("webpack").Configuration}
 *
 *
 */

const prodConfigs = {
	mode: 'development'
}
module.exports = merge({}, commonConfigs, prodConfigs)
