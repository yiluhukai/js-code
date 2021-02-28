const sass = require('node-sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
	grunt.initConfig({
		//sass任务
		sass: {
			options: {
				//  制定编译sass的模块
				implementation: sass,
				sourceMap: true
			},
			//
			dist: {
				files: {
					// 目标文件：源文件
					'./dist/css/main.css': 'scss/main.scss'
				}
			}
		},
		// babel任务
		babel: {
			options: {
				sourceMap: true,
				presets: ['@babel/preset-env']
			},
			dist: {
				files: {
					// 目标文件：源文件
					'dist/js/app.js': 'src/app.js'
				}
			}
		},
		watch: {
			scripts: {
				//检测文件的变化
				files: ['src/*.js', 'scss/*.scss'],
				// 文件变化执行的任务
				tasks: ['babel', 'sass'],
				options: {
					spawn: false
				}
			}
		}
	})
	// grunt.loadNpmTasks('grunt-sass')
	// grunt.loadNpmTasks('grunt-babel')
	// grunt.loadNpmTasks('grunt-contrib-watch')
	//  自动加载grunt插件
	loadGruntTasks(grunt)
	// 每次启动先执行一次sass和babel任务，文件变化的时候再执行sass和babel任务
	grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
