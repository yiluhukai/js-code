/**
 * 可达对象
 */

function objGroup(obj1, obj2) {
	obj1.prev = obj2
	obj2.next = obj1
	return {
		o1: obj1,
		o2: obj2
	}
}

const obj = objGroup({ name: 'obj1' }, { name: 'obj2' })

Reflect.deleteProperty(obj, 'o1')

Reflect.deleteProperty(obj.o2, 'next')

console.log(obj['o1'], obj.o2['next'])
