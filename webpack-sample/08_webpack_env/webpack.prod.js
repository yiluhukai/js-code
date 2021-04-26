const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// @ts-ignore
module.exports = merge(common, { mode: 'production', plugins: [new CleanWebpackPlugin(), new CopyPlugin(['public'])] })
