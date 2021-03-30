import { fileURLToPath } from 'url'
import { dirname } from 'path'
//__filepath

const filepath = fileURLToPath(import.meta.url)
console.log(filepath) ///Users/lijunjie/js-code/module-scheme/es_module_difference/esm.mjs

//__dirname

console.log(dirname(filepath)) ///Users/lijunjie/js-code/module-scheme/es_module_difference
