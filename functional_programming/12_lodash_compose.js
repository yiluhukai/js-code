const _ = require('lodash')

const first = arr => arr[0]

const reverse = arr => arr.reverse()

const toUpper = s => s.toUpperCase()

const fn = _.flowRight(toUpper, first, reverse)

console.log(fn(['hello', 'world']))
