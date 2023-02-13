import React, { useState } from 'react'

export default function UseState(props) {
	// const initialCount = props.count || 0 // 只需要被执行一次
	const [count, setCount] = useState(() => props.count || 0)

	const handleClick = () => {
		setCount(count => {
			const newCount = count + 1
			document.title = newCount // 去的还是前一次的值
			return newCount
		})
	}

	return (
		<div>
			<span>{count}</span>
			<button onClick={handleClick}>+1</button>
		</div>
	)
}
