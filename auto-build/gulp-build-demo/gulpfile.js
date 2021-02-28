const { src, dest, parallel, series, watch } = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')

const data = {
	menus: [
		{
			name: 'Home',
			icon: 'aperture',
			link: 'index.html'
		},
		{
			name: 'Features',
			link: 'features.html'
		},
		{
			name: 'About',
			link: 'about.html'
		},
		{
			name: 'Contact',
			link: '#',
			children: [
				{
					name: 'Twitter',
					link: 'https://twitter.com/w_zce'
				},
				{
					name: 'About',
					link: 'https://weibo.com/zceme'
				},
				{
					name: 'divider'
				},
				{
					name: 'About',
					link: 'https://github.com/zce'
				}
			]
		}
	],
	pkg: require('./package.json'),
	date: new Date()
}
// 处理scss
function styles() {
	//由 src() 生成的 Vinyl 实例是用 glob base 集作为它们的 base 属性构造的。当使用 dest() 写入文件系统时，将从输出路径中删除 base ，以保留目录结构。
	return src('src/assets/styles/*.scss', { base: 'src' })
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(dest('dist'))
}
// 处理js脚本
function scripts() {
	return src('src/assets/scripts/*.js', { base: 'src' })
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(dest('dist'))
}

//处理html文件

function pages() {
	// data是模版数据的填充
	return src('src/*.html').pipe(swig(data)).pipe(dest('dist'))
}

// module.exports = {
// 	styles,
// 	scripts,
// 	pages
// }

const compile = parallel(styles, scripts, pages)

module.exports = {
	compile
}
