/**
 * 特殊类型
 *
 * @flow
 */
//变量的值只能是'foo’
const a: 'foo' = 'foo'

//联合类型，值只能是其中的几个

const t: 'foo' | 'bar' | 'far' = 'foo'

//类型别名

type StringOrNumber = string | number

let s: StringOrNumber = '10'

s = 10

// maybe类型

const m: ?number = undefined //null//10

// 上面的maybe类型等价于下面的联合类型

const m1: number | null | void = undefined


//