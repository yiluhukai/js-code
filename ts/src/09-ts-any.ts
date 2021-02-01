/***
 *
 *  使用any来接受任意类型值
 *
 */
export = {}

function stringfy(obj: any): string {
	//  JSON.stringify的第一个参数就是any类型的
	return JSON.stringify(obj)
}

stringfy('hello')

stringfy(100)

const obj: any = {}

// 语法上不会报错，所以any类型不是类型安全的
obj.hello()
