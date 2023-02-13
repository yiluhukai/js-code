import { AutoComplete, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ClipboardJS from 'clipboard'
// const { Option } = AutoComplete
import { useClickAway } from 'ahooks'
const { TextArea } = Input
const MyAutoComplete = () => {
	const [options, setOptions] = useState([])
	const [value] = useState(12)
	const conatinerRef = useRef(null)

	useEffect(() => {
		new ClipboardJS('.btn')
	}, [])

	useClickAway(() => {
		console.log('click away')
	}, [conatinerRef.current])

	const handleSearch = value => {
		setOptions(
			!value
				? []
				: ['gmail.com', '163.com', 'qq.com']
						.map(domain => `${value}@${domain}`)
						.map(email => ({
							label: (
								<div key={email} value={email}>
									{email}
									<button
										className="btn"
										data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
									>
										Copy to clipboard
									</button>
								</div>
							),
							value: email
						}))
		)
	}

	const handleKeyPress = ev => {
		console.log('handleKeyPress', ev)
	}

	const onSelect = value => {
		console.log('onSelect', value)
	}

	return (
		<div ref={conatinerRef}>
			<AutoComplete
				options={options}
				style={{
					width: 200
				}}
				onSelect={onSelect}
				onSearch={handleSearch}
				onBlur={() => {
					console.log('onblur')
				}}
				getPopupContainer={() => conatinerRef.current}
			>
				<TextArea
					placeholder="input here"
					className="custom"
					style={{
						height: 50
					}}
					value={value}
					onKeyPress={handleKeyPress}
				/>
			</AutoComplete>
		</div>
	)
}

export default MyAutoComplete
