//  函数的作为返回值

// once函数

function once(func) {
	let done = false

	return function (money) {
		if (!done) {
			done = true
			return func(money)
		}
	}
}

function payMoney(money) {
	console.log(`I have paid you ${money} money!`)
}

const pay = once(payMoney)

pay()
pay()
pay()
pay()
