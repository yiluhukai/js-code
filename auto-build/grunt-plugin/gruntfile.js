module.exports = grunt => {
	// 使用grunt插件
	grunt.initConfig({
		clean: {
			// 删除当前目录下的所有txt文件
			txt: ['*.txt'],
			// 删除src基src下子目录中的文件
			src: ['src/**']
		}
	})
	grunt.loadNpmTasks('grunt-contrib-clean')
}
