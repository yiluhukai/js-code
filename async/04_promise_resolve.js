const p1 = Promise.resolve(10).then(val => {
	console.log(val) //10
})

const p2 = Promise.resolve(p1)

console.log(p1 === p2) //true

const thenableObj = {
	then: function (resove, reject) {
		resove(111)
	}
}

Promise.resolve(thenableObj).then(val => {
	console.log(val) //111
})
