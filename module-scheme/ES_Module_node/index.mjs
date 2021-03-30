// @ts-nocheck
import { name, age } from './moduleA.mjs'
//import { map } from 'lodash'
import { writeFileSync } from 'fs'
console.log(name, age)

//console.log(map([1, 2, 3], item => item + 1)) //[ 2, 3, 4 ]

writeFileSync('./foo.txt', 'esm is working')
