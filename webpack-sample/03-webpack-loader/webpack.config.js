//@ts-check
const path = require('path')

/**
 * @type { import("clean-webpack-plugin") }
 *
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * @type {import('webpack').Plugin}
 */
class MyPlugin {
	/**
	 *
	 * @param { import('webpack').Compiler } compiler
	 */
	apply(compiler) {
		//Executed right before emitting assets to output dir.
		compiler.hooks.emit.tap('myPlugin', function (compilation) {
			for (const name in compilation.assets) {
				// output filename
				//bundle.js
				// index.html
				// about.html
				// logo.png
				//console.log(name)
				// source
				//console.log(compilation.assets[name].source())

				//对输出到js文件的内容中的注释处理
				if (name.endsWith('.js')) {
					// 利用正则表示表达式去替换
					const contents = compilation.assets[name].source()
					const widthoutContents = contents.replace(/\/\*\*\*+\//g, '')
					compilation.assets[name] = {
						source: () => widthoutContents,
						size: () => widthoutContents.length
					}
				}
			}
		})
	}
}
/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
	mode: 'none',
	entry: './hello.md',
	//entry: './src/main.css',
	output: {
		filename: 'bundle.js',
		// 绝对路径
		path: path.join(__dirname, 'dist')
		//publicPath: 'dist/'
	},
	module: {
		rules: [
			{
				test: /\.md$/,
				use: ['html-loader', './markdown-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		//index.html配置
		new HtmlWebpackPlugin({
			title: 'Webpack Plugin Sample',
			content: 'custom content',
			meta: {
				viewport: 'width=device-width'
			},
			template: './index.html'
		}),
		new HtmlWebpackPlugin({
			title: 'About',
			filename: 'about.html'
		}),
		new CopyWebpackPlugin(['public']),
		new MyPlugin()
	],
	devServer: {
		contentBase: './public',
		proxy: {
			// 需要匹配的请求路径
			'/api': {
				//http://localhost:8080/api/users -> http://api.github.com/api/users
				target: 'http://api.github.com/users',
				//http://localhost:8080/api/users -> http://api.github.com/api/users
				pathRewrite: {
					'^/api': ''
				},
				// 不设置的话api服务器便可以从origin中获取到http://localhost:8080/
				changeOrigin: true
			}
		}
	}
}
