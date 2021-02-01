/*
 * @Author: yiluhuakai
 * @LastEditors: yiluhuakai
 * @Date: 2020-12-31 22:19:51
 * @LastEditTime: 2020-12-31 23:01:35
 * @FilePath: /js-code/ES6/set_map.js
 */

const mySet = new Set()

mySet.add(1).add(2).add(3)
//Set { 1, 2, 3 }

const res = mySet.has(1)
console.log(res) //true

console.log('size =', mySet.size) //3

mySet.delete(1)

console.log(mySet) // Set { 2, 3 }

const keys = mySet.keys()

console.log(keys.next()) //{ value: 2, done: false }

console.log('values =', mySet.values()) //values = [Set Iterator] { 2, 3 }

mySet.clear()

console.log(mySet) //Set {}

const mySet1 = new Set([1, 2, 4])

mySet1.forEach((value, key, set) => {
	console.log(value, key, set)
	// 1 1 Set { 1, 2, 4 }
	// 2 2 Set { 1, 2, 4 }
	// 4 4 Set { 1, 2, 4 }
})

for (const ele of mySet1) {
	console.log(ele)
	//1
	// 2
	// 4
}

const r_Arr = [1, 1, 2, 3, 5, 8]

console.log(Array.from(new Set(r_Arr))) //[ 1, 2, 3, 5, 8 ]

console.log([...new Set(r_Arr)]) //[ 1, 2, 3, 5, 8 ]

const myMap = new Map() //Map {}

myMap.set(1, 'a').set(2, 'b') //Map { 1 => 'a', 2 => 'b' }

console.log('size', myMap.size) // size 2

console.log(myMap.get(1)) // 'a'

console.log(myMap.has(1)) // true

myMap.delete(1) //Map { 2 => 'b' }

myMap.clear() //Map {}

const map1 = new Map([[1, 'one']]) //Map { 1 => 'one' }

console.log(myMap)
console.log(map1)
