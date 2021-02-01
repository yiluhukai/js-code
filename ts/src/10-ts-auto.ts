/**
 *
 *  类型推断
 *
 */

export = {}

let a = 'string' // let a:string="string"
//Type '100' is not assignable to type 'string'
// a = 100

let o // let o:any = undfined

o = 100

o = {}

// 不推荐使用any类型，不利于后期代码维护
