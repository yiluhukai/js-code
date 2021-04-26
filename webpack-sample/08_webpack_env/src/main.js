import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

// if (module.hot) {
//   let hotEditor = editor
//   module.hot.accept('./editor.js', () => {
//     const value = hotEditor.innerHTML
//     document.body.removeChild(hotEditor)
//     hotEditor = createEditor()
//     hotEditor.innerHTML = value
//     document.body.appendChild(hotEditor)
//   })
// }

// if (module.hot) {
//   module.hot.accept('./better.png', () => {
//     img.src = background
//     console.log(1)
//   })
// }
// 保存上次的结果，在hmr生效时直接移除
if (module.hot) {
	let hotEditor = editor
	module.hot.accept('./editor.js', () => {
		const value = hotEditor.innerHTML
		document.body.removeChild(hotEditor)
		hotEditor = createEditor()
		hotEditor.innerHTML = value
		document.body.appendChild(hotEditor)
	})
	module.hot.accept('./better.png', () => {
		img.src = background
		console.log('hmr for png')
	})
}
console.log(base_url)
