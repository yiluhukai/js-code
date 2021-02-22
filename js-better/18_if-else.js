/**
 *
 * 减少代码的层级判断
 *
 */

function doSomething(part, chapter) {
	const parts = ['es2015', 'Vue', 'React']
	if (part) {
		console.log('part存在')
		if (parts.includes(part)) {
			console.log('对应的课程存在')
			if (chapter > 5) {
				console.log('这些章节是vip课程')
			}
		}
	} else {
		console.log('part不存在')
	}
}

doSomething('es2015', 6)

//简化代码的层级

function doSomething(part, chapter) {
	const parts = ['es2015', 'Vue', 'React']
	if (!part) {
		console.log('part不存在')
		return
	}
	console.log('part存在')
	if (!parts.includes(part)) {
		return
	}
	console.log('对应的课程存在')
	if (chapter > 5) {
		console.log('这些章节是vip课程')
	}
}
