/**
 *
 * 枚举类型
 *
 */
// 使用对象
// const postStatus = {
// 	Draft: 0,
// 	UnPublished: 1,
// 	Published: 2
// }

// 使用TS中的枚举类型

const enum postStatus {
	Draft = 0,
	UnPublished = 1,
	Published = 2
}

const post = {
	title: 'foo',
	content: 'foo...',
	status: postStatus.Draft //0
}

enum statuses {
	closed = 1,
	opened //2
}

enum others {
	others = 'other',
	math = 'math'
}

statuses.closed

others.math
