import createHeading from './heading.js'
import './main.css'
import icon from './icon.png'

console.log1('headings')
const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)

console.log('main.js running')
