import React from 'react'
import { useFormik } from 'formik'
function App() {
	const formik = useFormik({
		// 处理值
		initialValues: {
			username: 'bruce',
			password: '123456'
		},
		// 提交后执行的毁掉函数
		onSubmit: values => {
			console.log(values)
		}
	})

	return (
		<div className="App">
			<form onSubmit={formik.handleSubmit}>
				<input
					type="text"
					name="username"
					value={formik.values.username}
					onChange={formik.handleChange}
				/>

				<input
					type="password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>
				<input type="submit" />
			</form>
		</div>
	)
}

export default App
