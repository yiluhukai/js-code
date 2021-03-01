const { src, dest, parallel, series, watch } = require('gulp')
const bs = require('browser-sync').create()
const plugins = require('gulp-load-plugins')()

//const plugins.sass = require('gulp-sass')
//const plugins.babel = require('gulp-babel')
//const plugins.swig = require('gulp-swig')
//const plugins.imagemin = require('gulp-imagemin')
const del = require('del')

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
		.pipe(plugins.sass({ outputStyle: 'expanded' }))
		.pipe(dest('dist'))
		.pipe(bs.reload({ stream: true }))
}
// 处理js脚本
function scripts() {
	return src('src/assets/scripts/*.js', { base: 'src' })
		.pipe(plugins.babel({ presets: ['@babel/env'] }))
		.pipe(dest('dist'))
		.pipe(bs.reload({ stream: true }))
}

//处理html文件

function pages() {
	// data是模版数据的填充
	return src('src/*.html', { base: 'src' })
		.pipe(plugins.swig({ data, cache: false }))
		.pipe(dest('dist'))
		.pipe(bs.reload({ stream: true }))
}

// 压缩图片文件

function images() {
	return src('src/assets/images/**', { base: 'src' }).pipe(plugins.imagemin()).pipe(dest('dist'))
}
//  处理字体文件
function fonts() {
	return src('src/assets/fonts/**', { base: 'src' }).pipe(plugins.imagemin()).pipe(dest('dist'))
}

// 复制public 的文件
function extra() {
	return src('public/**', { base: 'public' }).pipe(dest('dist'))
}

// 删除dist目录下面的文件

function clean() {
	// 返回的是一个promise
	return del(['dist'])
}

// 创建一个开发服务器
function serve() {
	watch('src/assets/styles/*.scss', styles)
	watch('src/assets/scripts/*.js', scripts)
	watch('src/*.html', pages)
	// watch('src/assets/images/**', images)
	// watch('src/assets/fonts/**', fonts)
	// watch('public/**', extra)
	watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
	bs.init({
		server: {
			//制定对那些文件启动静态服务
			baseDir: ['dist', 'src', 'public'],
			routes: {
				'/node_modules': 'node_modules'
			}
		},
		//	制定端口
		port: 3000,
		// 是否在浏览器直接打开
		open: true,
		// 是否显示服务器启动时候的提示信息
		notify: false
		// 添加那些文件的变化
		// files: 'dist/**'
	})
}

// module.exports = {
// 	styles,
// 	scripts,
// 	pages
// }

const compile = parallel(styles, scripts, pages)

const build = series(clean, parallel(compile, images, fonts, extra))

const develop = series(clean, compile, serve)

module.exports = {
	build,
	serve,
	develop
}
