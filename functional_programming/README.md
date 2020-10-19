#### 为什么需要学习函数式编程

-   函数式编程是随着 React 的流行受到越来越多的关注
-   Vue3 也开始拥抱函数式编程
-   函数式编程可以抛弃 this
-   打包过程中可以更好的利用 tree shaking 过滤无用代码方便 测试、方便并行处理
-   有很多库可以帮助我们进行函数式开发:lodash、underscore、ramda

#### 什么是函数式编程

函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程 编程、面向对象编程。

-   面向对象编程的思维方式:把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和 多态来演示事物事件的联系

-   函数式编程的思维方式:把现实世界的事物和事物之间的联系抽象到程序世界(对运算过程进行抽象)
    -   程序的本质:根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数
    -   x -> f(联系、映射) -> y，y=f(x) 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如:y = sin(x)，x 和 y 的关系
    -   相同的输入始终要得到相同的输出(纯函数) 函数式编程用来描述数据(函数)之间的映射

```js
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2 console.log(sum)
// 函数式
function add (n1, n2) {
  return n1 + n2
}
let sum = add(2, 3)
console.log(sum)
```

#### 函数是一等公民(First-class Function)

[First-class Function](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)

当一门编程语言的函数可以被当作变量一样用时，则称这门语言拥有头等函数(First-class Function)。

为什么在 js 中函数是一等公民：

-   函数可以存储在变量中
-   函数作为参数
-   函数作为返回值

```js
const foo = function () {
	console.log('foobar')
}
// 用变量来调用它
foo()
```

#### 高阶函数(Higher-Order Function)

-   函数作为参数传递给另一个函数

```js
//  函数作为参数

function forEach(arr, func) {
	for (let i = 0; i < arr.length; i++) {
		func(arr[i])
	}
}

// test

const arr = [1, 2, 3, 4, 5]

forEach(arr, ele => {
	console.log(ele)
})

function filter(arr, func) {
	const res = []
	for (let i = 0; i < arr.length; i++) {
		if (func(arr[i])) {
			res.push(arr[i])
		}
	}
	return res
}

const res = filter(arr, ele => ele % 2 == 0)
console.log(res)
```

主要可以使函数的调用更加的灵活，把函数中个性化的内容提取出来

-   函数作为另一个函数的返回值

```js
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
```

主要用于在已有函数的基础上增加一些自定义的内容，返回一个新的函数

#### 高阶函数的意义

-   抽象可以帮我们屏蔽细节，只需要关注于我们的目标
-   实现那种面向切面编程的感觉，在已有函数的执行前后增加一些新的逻辑

#### 数组中常用的高阶函数的实现

-   forEach
-   filter
-   map
-   some
-   every
-   find

使用 const 关键字声明可以防止函数被修改，使用箭头函数可以使函数更简洁

```js
const map = (arr, func) => {
	const res = []
	for (const item of arr) {
		res.push(func(item))
	}
	return res
}

// test

console.log(map(arr, ele => ele * 2))

const some = function some(arr, func) {
	let flag = false
	for (const item of arr) {
		if (func(item)) {
			flag = true
			break
		}
	}
	return flag
}
console.log(some(arr, ele => ele === 4))

// every

const every = (arr, func) => {
	let flag = true
	for (const item of arr) {
		if (!func(item)) {
			flag = false
			break
		}
	}

	return flag
}

console.log(every(arr, ele => ele < 4))

// find

const find = (arr, func) => {
	for (const item of arr) {
		if (func(item)) {
			return item
		}
	}
	return
}

//

console.log(find(arr, item => item === 4))
console.log(find(arr, item => item === 10))
```

#### 闭包

函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。

```js
// 函数作为返回值
function makeFn() {
	let msg = 'Hello function'
	return function () {
		console.log(msg)
	}
}
const fn = makeFn()
fn()
```

闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，但是 堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员

闭包的使用：计算员工的工资，工资由两部分组成，其中一部分是基本工资，另一部分是绩效工资

```js
const getSalary = (base, performance) => {
	return base + performance
}

getSalary(12000, 500)
getSalary(12000, 600)
```

因为员工的基础工资是一样的，我们每次只需要通过使用闭包修改这个函数，每次只需要传入绩效工资即可。

```js
function getSalary(base) {
	return function (performance) {
		return base + performance
	}
}

const getSalary1 = getSalary(12000)

console.log(getSalary1(400))
console.log(getSalary1(800))
```

在浏览器中查看闭包

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>

	<body>
		<script>
			function getSalary(base) {
				return function (performance) {
					return base + performance
				}
			}

			const getSalary1 = getSalary(12000)

			console.log(getSalary1(400))
			console.log(getSalary1(800))
		</script>
	</body>
</html>
```

在 getSalary1 执行的可以通过断点进入函数的内部，可以看到 closure 中包含了 base

#### 纯函数

-   纯函数:相同的输入永远会得到相同的输出，而且没有任何可观察的副作用

    -   纯函数就类似数学中的函数(用来描述输入和输出之间的关系)，y = f(x) ![5cfb376d9578b7d7570aabed2a58cc2f.png](evernotecid://48BC2FAB-231C-4AC6-BF8E-D98489F70F11/appyinxiangcom/24780240/ENResource/p64)

-   [lodash](https://github.com/lodash/lodash) 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法
-   数组的 slice 和 splice 分别是:纯函数和不纯的函数
    -   slice 不会返回数组中的指定部分，不会改变原数组
    -   splice 会改变原数组

```js
let numbers = [1, 2, 3, 4, 5] // 纯函数
numbers.slice(0, 3) // => [1, 2, 3]
numbers.slice(0, 3) // => [1, 2, 3]
numbers.slice(0, 3) // => [1, 2, 3]
// 不纯的函数
numbers.splice(0, 3) // => [1, 2, 3] numbers.splice(0, 3) // => [4, 5] numbers.splice(0, 3) // => []
```

-   函数式编程不会保留计算中间的结果，所以变量是不可变的(无状态的)

```js
// 纯函数

function getSum(num1, num2) {
	return num1 + num2
}
console.log(getSum(1, 2)) // =>3
console.log(getSum(1, 2)) // =>3
console.log(getSum(1, 2)) // =>3
```

-   我们可以把一个函数的执行结果交给另一个函数去处理

#### lodash 使用

```js
// lodash的方法
// first、last、reverse、each、find、findIndex
const _ = require('lodash')

const arr = ['cat', 'dog', 'pig']

console.log(_.first(arr))

console.log(_.last(arr))
//  会改变原数组
console.log(_.reverse(arr)) // [ 'pig', 'dog', 'cat' ]

r = _.each(arr, (item, index) => {
	console.log(item, index)
})
//
console.log(r) // [ 'pig', 'dog', 'cat' ]
```

#### 纯函数的好处

-   可缓存
    -   因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来

```js
// 记忆函数
const _ = require('lodash')

function getArea(r) {
	console.log(r)
	return Math.PI * r * r
}

// const _getArea = _.memoize(getArea)

// console.log(_getArea(2))
// console.log(_getArea(2))
// console.log(_getArea(2))

// 自己实现memoize

function _memoize(func) {
	const cache = {}
	return function () {
		const key = JSON.stringify(arguments)
		cache[key] = cache[key] || func.apply(func, arguments)

		return cache[key]
	}
}
const _getArea = _memoize(getArea)
console.log(_getArea(2))
console.log(_getArea(2))
console.log(_getArea(2))
```

-   可测试
    -   纯函数让测试更方便
-   并行处理
    -   在多线程环境下并行操作共享的内存数据很可能会出现意外情况
    -   纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数 (Web Worker)

#### 副作用

纯函数:对于相同的输入永远会得到相同的输出，而且没有任何可观察的副作用

```js
// 不纯的
let mini = 18
function checkAge (age) {
  return age >= mini
}
// 纯的(有硬编码，后续可以通过柯里化解决) function checkAge (age) {
let mini = 18
  return age >= mini
}
```

副作用让一个函数变的不纯(如上例)，纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部 的状态就无法保证输出相同，就会带来副作用。

副作用的来源：

-   配置文件
-   数据库
-   获取用户的输入

所有的外部交互都有可能带来副作用，副作用也使得方法通用性下降不适合扩展和可重用性，同时副作 用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控 范围内发生。

#### 柯里化 (Haskell Brooks Curry)

```js
function checkAge (age) { let min = 18
    return age >= min
}
// 普通纯函数
function checkAge (min, age) {
    return age >= min
}
checkAge(18, 24)
checkAge(18, 20)
checkAge(20, 30)
// 柯里化
function checkAge (min) {
    return function (age) {
        return age >= min
} }
// ES6 写法
let checkAge = min => (age => age >= min)
let checkAge18 = checkAge(18) let checkAge20 = checkAge(20)
checkAge18(24)
checkAge18(20)
```

-   柯里化 (Currying):
    -   当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数以后永远不变)
    -   然后返回一个新的函数接收剩余的参数，返回结果

#### lodash 中的柯里化函数

-   \_.curry(func)

    -   功能:创建一个函数，该函数接收一个或多个 func 的参数，如果 func 所需要的参数都被提供则执行 func 并返回执行的结果。否则继续返回该函数并等待接收剩余的参数。
    -   参数:需要柯里化的函数
    -   返回值:柯里化后的函数

```js
//  lodash的curry函数

const _ = require('lodash')

function getSum(a, b, c) {
	return a + b + c
}

const curried = _.curry(getSum)

console.log(curried(1, 2, 3))

console.log(curried(1)(2)(3))

console.log(curried(1, 2)(3))
```

#### curry 的使用案例

```js
//  面向过程的写法，代码无法复用
// ''.match(/\w+/g)
// ''.match(/\s+/g)
// 函数式编程

const _ = require('lodash')
function match(reg, str) {
	return str.match(reg)
}

//拆分成更细粒度的函数

const curried = _.curry(match)

const spaceMatch = curried(/\s+/g)
const numberMatch = curried(/\d+/g)

console.log(spaceMatch('hello  wolrd'))
console.log(numberMatch('123-321'))

//  匹配数组中每个元素

const filter = _.curry(function (func, arr) {
	return arr.filter(func)
})

console.log(filter(spaceMatch, ['hello world', 'abc']))
//拆分成更细粒度的函数,并复用之前的函数

const haveSpace = filter(spaceMatch)
const haveNumber = filter(numberMatch)

console.log(haveSpace(['hello world', 'abc']))

console.log(haveNumber(['hello world 123', 'abc 123']))
```

#### curry 的总结

-   柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
-   这是一种对函数参数的缓存
-   让函数变的更灵活，让函数的粒度更小
-   可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能

#### 自定义 lodash 中的 curry 函数

```js
const curry = function (func) {
	return function curried(...arg) {
		// 传入的参数不够
		if (arg.length < func.length) {
			return function () {
				// 将参数合并继续返回curry后的结果
				return curried(...arg.concat(Array.from(arguments)))
			}
		} else {
			return func(...arg)
		}
	}
}

function getSum(a, b, c) {
	return a + b + c
}

const curried = curry(getSum)

console.log(curried(1, 2, 3))

console.log(curried(1)(2)(3))

console.log(curried(1, 2)(3))
```

#### 函数的组合

-   纯函数和柯里化很容易写出洋葱代码 h(g(f(x))) \* 获取数组的最后一个元素再转换成大写字母， _.toUpper(_.first(\_.reverse(array)))
    ![8834e8783ab9237b98c72b167bc4cd10.jpeg](evernotecid://48BC2FAB-231C-4AC6-BF8E-D98489F70F11/appyinxiangcom/24780240/ENResource/p66)

-   函数组合可以让我们把细粒度的函数重新组合生成一个新的函数

#### 管道

下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b。可以想想 a 数据 通过一个管道得到了 b 数据。
![b21aa355e02ee36fbcc064bee6b5ff46.png](evernotecid://48BC2FAB-231C-4AC6-BF8E-D98489F70F11/appyinxiangcom/24780240/ENResource/p67)
当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分成多个小函数，此时多了中间运算过程产生的 m 和 n。
下面这张图中可以想象成把 fn 这个管道拆分成了 3 个管道 f1, f2, f3，数据 a 通过管道 f3 得到结果 m，m 再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b
![8a045054d28113e7e2c9234946df2343.png](evernotecid://48BC2FAB-231C-4AC6-BF8E-D98489F70F11/appyinxiangcom/24780240/ENResource/p68)

```js
const fn = compose(f1, f2, f3)

const b = fn(a)
```

#### 函数组合

-   函数组合 (compose):如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
    -   函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
    -   函数组合默认是从右到左执行

```js
//  只有两个参数的函数组合

function compose(f, g) {
	return function (value) {
		return f(g(value))
	}
}

// 获取数组的最后一个元素并转化为大写

const reverse = arr => arr.reverse()

const first = arr => arr[0]

const getLast = compose(first, reverse)

console.log(getLast([1, 2, 3]))
```

-   lodash 中的组合函数
-   lodash 中组合函数 flow() 或者 flowRight()，他们都可以组合多个函数
    -   flow() 是从左到右运行
    -   flowRight() 是从右到左运行，使用的更多一些

```js
const _ = require('lodash')

const first = arr => arr[0]

const reverse = arr => arr.reverse()

const toUpper = s => s.toUpperCase()

const fn = _.flowRight(toUpper, first, reverse)

console.log(fn(['hello', 'world']))
```

-   模拟实现 lodash 的 flowRight 方法

```js
//  模拟lodash中的flowRight

// const flowRight = function (...arg) {
// 	return function (value) {
// 		return arg.reduceRight((prev, fn) => fn(prev), value)
// 	}
// }
// 使用es6简化

const flowRight = (...arg) => value => arg.reduceRight((prev, fn) => fn(prev), value)

const first = arr => arr[0]

const reverse = arr => arr.reverse()

const toUpper = s => s.toUpperCase()

const fn = flowRight(toUpper, first, reverse)

console.log(fn(['hello', 'world']))
```

-   函数的组合要满足结合律 (associativity):
    我们既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的

```js
// 结合律(associativity)
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h)) // true
```

-   所以代码还可以像下面这样

```js
// 函数组合的规律

const _ = require('lodash')

//const fn = _.flowRight(_.toUpper, _.first, _.reverse)
//const fn = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const fn = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
console.log(fn(['first', 'second', 'third']))
```

#### 函数组合的调试方法

```js
// 函数组合的调试

// 函数组合是将一个函数的返回值交给下一个函数

// NEVER SAY DIE => never-say-die

const _ = require('lodash')

const trace = _.curry((tag, v) => {
	console.log(tag, v)
	return v
})

//  curry为一元函数

const split = _.curry((seq, str) => _.split(str, seq))

const toLower = s => _.toLower(s)

const map = _.curry((fn, arr) => _.map(arr, fn))

//  curry为一元函数
const join = _.curry((seq, arr) => _.join(arr, seq))

//const fn = _.flowRight(join('-'), trace('join前'), toLower, trace('toLower前'), split(' '))
// 可以发现low的返回值不是一个数组，所以使用我们自定义的map函数
const fn = _.flowRight(join('-'), trace('join前'), map(toLower), trace('toLower前'), split(' '))
// 可以发现low的返回值不是一个数组，所以使用

console.log(fn('NEVER SAY DIE'))
```

#### lodash 中的 fp 模块

-   lodash/fp 和 lodash 模块的区别
    -   lodash 的 fp 模块提供了实用的对函数式编程友好的方法
    -   提供了不可变 auto-curried iteratee-first data-last 的方法

```js
// lodash 模块
const _ = require('lodash')

_.map(['a', 'b', 'c'], _.toUpper) // => ['A', 'B', 'C']

_.map(['a', 'b', 'c']) // => ['a', 'b', 'c']

_.split('Hello World', ' ') // lodash/fp 模块

const fp = require('lodash/fp')
fp.map(fp.toUpper, ['a', 'b', 'c'])
fp.map(fp.toUpper)(['a', 'b', 'c'])
fp.split(' ', 'Hello World') fp.split(' ')('Hello World')
```

-   map 方法中函数参数的不同

```js
// lodash/fp和lodash中map方法的不同
const _ = require('lodash')

console.log(_.map(['1', '2', '3'], parseInt)) //[ 1, NaN, NaN ]

//parseInt(1,0,[1,2,3])
//parseInt(2,1,[1,2,3])
//parseInt(3,2,[1,2,3])

const fp = require('lodash/fp')

//parseInt只接受一个参数

console.log(fp.map(parseInt, ['1', '2', '3'])) //[ 1, 2, 3 ]
```

使用

```js
// 函数组合的调试

// 函数组合是将一个函数的返回值交给下一个函数

// NEVER SAY DIE => never-say-die

//  对比15中的实现，可以看出lodash中fp模块对函数式编程更加友好
const fp = require('lodash/fp')

const fn = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

console.log(fn('NEVER SAY DIE'))
```

#### Point Free

Point Free:我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数。Point Free 是一种编程风格。

-   不需要指明处理的数据
-   只需要合成运算过程
-   需要定义一些辅助的基本运算函数

```js
constf = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(''))
```

-   案例演示

```js
// 非 Point Free 模式
// Hello World => hello_world
function f(word) {
	return word.toLowerCase().replace(/\s+/g, '_')
}
// Point Free
const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
console.log(f('Hello World'))
```

-   使用 Point Free 的模式，把单词中的首字母提取并转换成大写

```js
//world wild web =>W. W. W

const fp = require('lodash/fp')
//  循环两次
const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))

//只循环一次

//const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))
console.log(firstLetterToUpper('world wild web')) // => W. W. W
```

#### Functor (函子)

#### 为什么要学函子

到目前为止已经已经学习了函数式编程的一些基础，但是我们还没有演示在函数式编程中如何把副作用 控制在可控的范围内、异常处理、异步操作等。

#### 什么是 Functor

-   容器:包含值和值的变形关系(这个变形关系就是函数)
-   函子:是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理(变形关系)

#### Functor 函子

```js
// 函子

// class Container {
// 	constructor(value) {
// 		this._value = value
// 	}
// 	// 对数据进行处理，返回一个新的函子
// 	map(fn) {
// 		return new Container(fn(this._value))
// 	}
// }

// const container = new Container(2)

//  改进

class Container {
	static of(val) {
		return new Container(val)
	}

	constructor(value) {
		this._value = value
	}
	// 对数据进行处理，返回一个新的函子
	map(fn) {
		return Container.of(fn(this._value))
	}
}

const container = Container.of(2)

const r = container.map(value => value + 2).map(val => val * val)

console.log(r)
```

-   总结
    -   函数式编程的运算不直接操作值，而是由函子完成
    -   函子就是一个实现了 map 契约的对象
    -   我们可以把函子想象成一个盒子，这个盒子里封装了一个值
    -   想要处理盒子中的值，我们需要给盒子的 map 方法传递一个处理值的函数(纯函数)，由这个函数来对值进行处理
    -   最终 map 方法返回一个包含新值的盒子(函子)
-   在 Functor 中如果我们传入 null 或 undefined

```js
// 值如果不小心传入了空值(副作用)
Container.of(null).map(x => x.toUpperCase())
// TypeError: Cannot read property 'toUpperCase' of null
```

#### MayBe 函子

-   我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理
-   MayBe 函子的作用就是可以对外部的空值情况做处理(控制副作用在允许的范围)

```js
//  Maybe函子

class Maybe {
	static of(val) {
		return new Maybe(val)
	}

	constructor(value) {
		this._value = value
	}
	// 对数据进行处理，返回一个新的函子
	map(fn) {
		//如果对空值变形的话直接返回 值为 null 的函子
		return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
	}

	isNothing() {
		return this._value === null || this._value === undefined
	}
}

const r1 = Maybe.of(null).map(val => val.toUpperCase())

console.log(r1)

const r = Maybe.of(2)
	.map(value => value + 2)
	.map(val => val * val)

console.log(r)
```
