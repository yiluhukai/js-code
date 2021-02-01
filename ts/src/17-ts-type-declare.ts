/**
 *
 * 类型声明文件
 */

export = {}

import { cloneDeep } from 'lodash'

//手动添加类型声明

//declare function cloneDeep(params: object): object

// 类型被推断成any
//warning 'obj' is declared but its value is never read.
const obj = cloneDeep({})
