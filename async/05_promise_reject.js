const p1 = Promise.reject(10).catch(val => {
	console.log(val) //10
})

const p2 = Promise.reject(p1)

console.log(p1 === p2) //false

const thenableObj = {
	then: function (resove, reject) {
		resove(111)
	}
}

Promise.reject(thenableObj).then(val => {
	console.log(val) // thenableObj
})
