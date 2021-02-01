/**
 * mixed和any
 *
 * @flow
 */

function postMixed(val: mixed) {
	if (typeof val === 'string') {
		val.substr(1)
	}
	if (typeof val === 'number') {
		val * val
	}
}

function postAny(val: any) {
	val.substr(1)
	val * val
}

postMixed(100)
postMixed('foo')

postAny(100)
postAny('foo')
